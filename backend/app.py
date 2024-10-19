from flask import Flask, request, jsonify, session
import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv
from pathlib import Path
import openai
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Load environment variables from .env in the parent directory
env_path = Path('..') / '.env'
load_dotenv(dotenv_path=env_path)

# Database connection parameters
openai.api_key = os.getenv("OPENAI_API_KEY")
app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")
db_user = os.getenv("USER")
db_password = os.getenv("PASS")
db_host = os.getenv("HOST")
db_port = os.getenv("PORT")
db_name = os.getenv("DB_NAME")

# Global connection variable
conn = None

try:
    # Establish connection to the PostgreSQL database
    conn = psycopg2.connect(
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port,
        database=db_name
    )
    print("Connected to the database.")
    
except Exception as error:
    print(f"Error connecting to the database: {error}")


@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Flask PostgreSQL app!"})


@app.route('/add_medical', methods=['POST'])
def add_medical():

    # Get the JSON data from the request 
    data = request.get_json()
    
    # Extract fields from the request (ensure they're provided or set defaults)
    email = data.get('email')
    pass_hash = data.get('pass_hash')
    user_type = data.get('type', '')  # Optional fields can have defaults
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    address = data.get('address', '')
    phone = data.get('phone', '')
    dob = data.get('dob', None)  # dob can be NULL

    # Validate required fields
    if not email or not pass_hash:
        return jsonify({"error": "Missing required fields: email or pass_hash"}), 400

    try:
        cursor = conn.cursor()

        # Prepare the INSERT SQL query
        query = """
        INSERT INTO users (email, pass_hash, type, first_name, last_name, address, phone, dob)
        VALUES (%s, %s, medical, %s, %s, %s, %s, %s) RETURNING id;
        """

        # Execute the query with the data
        cursor.execute(query, (email, pass_hash, user_type, first_name, last_name, address, phone, dob))

        # Get the newly inserted user's id
        user_id = cursor.fetchone()[0]

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cursor.close()

        # Return the ID of the newly created user
        return jsonify({"message": "User added successfully", "user_id": user_id}), 201

    except Exception as e:
        conn.rollback()  # Rollback the transaction if there's an error
        return jsonify({"error": str(e)}), 500

@app.route('/add_admin', methods=['POST'])
def add_admin():
    data = request.get_json()  # Get the JSON data from the request
    
    # Extract fields from the request (ensure they're provided or set defaults)
    email = data.get('email')
    pass_hash = data.get('pass_hash')
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    address = data.get('address', '')
    phone = data.get('phone', '')
    dob = data.get('dob', None)  # dob can be NULL

    # Validate required fields
    if not email or not pass_hash:
        return jsonify({"error": "Missing required fields: email or pass_hash"}), 400

    try:
        cursor = conn.cursor()

        # Prepare the INSERT SQL query
        query = """
        INSERT INTO users (email, pass_hash, type, first_name, last_name, address, phone, dob)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
        """

        # Execute the query with the data
        cursor.execute(query, (email, pass_hash, "admin", first_name, last_name, address, phone, dob))

        # Get the newly inserted user's id
        user_id = cursor.fetchone()[0]

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cursor.close()

        # Return the ID of the newly created user
        return jsonify({"message": "User added successfully", "user_id": user_id}), 201

    except Exception as e:
        conn.rollback()  # Rollback the transaction if there's an error
        return jsonify({"error": str(e)}), 500

# Get questions router
@app.route('/questions', methods=['GET'])
def get_questions():
    try:
        cursor = conn.cursor()

        # Execute the query to fetch all questions
        cursor.execute("SELECT * FROM questions;")
        rows = cursor.fetchall()

        # Structure the data in JSON format
        questions = []
        for row in rows:
            question = {
                "id": row[0],
                "question": row[1],
                "client_field_name": row[2],
                "type": row[3]
            }
            questions.append(question)

        # Close the connection
        cursor.close()
        conn.close()

        # Return the questions in JSON format
        return jsonify(questions)

    except Exception as error:
        return jsonify({"error": str(error)})

# Create client router
@app.route('/create_client', methods=['POST'])
def create_client():
    try:
        data = request.get_json()

        # Extract user fields
        email = data.get('email')
        pass_hash = data.get('pass_hash')
        user_type = data.get('type', '')
        first_name = data.get('first_name', '')
        last_name = data.get('last_name', '')
        address = data.get('address', '')
        phone = data.get('phone', '')
        dob = data.get('dob', None)

        # Validate required fields for the users table
        if not email or not pass_hash:
            return jsonify({"error": "Missing required fields: email or pass_hash"}), 400

        cursor = conn.cursor()

        # Insert into users table
        user_query = """
        INSERT INTO users (email, pass_hash, type, first_name, last_name, address, phone, dob)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
        """
        cursor.execute(user_query, (email, pass_hash, user_type, first_name, last_name, address, phone, dob))

        # Get the newly inserted user's id
        user_id = cursor.fetchone()[0]

        # Fetch available columns from client_info table dynamically
        cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'client_info' AND column_name != 'user_id';")
        available_columns = [row[0] for row in cursor.fetchall()]

        # Filter incoming data based on available columns
        client_info_data = {key: value for key, value in data.items() if key in available_columns}

        # If there are fields to insert, construct a dynamic query
        if client_info_data:
            columns = ', '.join(client_info_data.keys())  # Join column names
            values = ', '.join(['%s'] * len(client_info_data))  # Create placeholders for values
            query = f"INSERT INTO client_info (user_id, {columns}) VALUES (%s, {values})"

            # Prepare values (user_id comes first, followed by the dynamic fields)
            values_to_insert = [user_id] + list(client_info_data.values())
            cursor.execute(query, values_to_insert)

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cursor.close()

        return jsonify({"message": "Client created successfully", "user_id": user_id}), 201

    except Exception as e:
        conn.rollback()  # Rollback the transaction if there's an error
        return jsonify({"error": str(e)}), 500

# Get client router
@app.route('/client/<int:id>', methods=['GET'])
def get_client(id):
    try:
        # Establish the database connection
        cursor = conn.cursor()

        # Use a LEFT JOIN to fetch data from both tables dynamically
        query = """
        SELECT u.*, c.*
        FROM users u
        LEFT JOIN client_info c ON u.id = c.user_id
        WHERE u.id = %s;
        """
        
        # Execute the combined query
        cursor.execute(query, (id,))
        data = cursor.fetchone()
        print(f"Data fetched: {data}")

        if not data:
            return jsonify({"error": "User not found"}), 404  # Return 404 if no user found

        # Dynamically get the column names for both users and client_info tables
        column_names = [desc[0] for desc in cursor.description]

        # Dynamically create a response JSON with all the fetched columns
        response = {column_names[i]: data[i] for i in range(len(data))}

        cursor.close()

        return jsonify(response), 200  # Return a 200 status code

    except Exception as error:
        print(f"Error occurred: {error}")
        return jsonify({"error": str(error)}), 500  # Return 500 for server errors

# Update client router
@app.route('/update_client/<int:user_id>', methods=['PUT'])
def update_client(user_id):
    try:
        data = request.get_json()

        cursor = conn.cursor()

        # Fetch available columns from client_info table dynamically
        cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'client_info' AND column_name != 'user_id';")
        available_columns = [row[0] for row in cursor.fetchall()]

        # Extract user fields from the incoming data
        email = data.get('email')
        pass_hash = data.get('pass_hash')
        user_type = data.get('type', None)
        first_name = data.get('first_name', None)
        last_name = data.get('last_name', None)
        address = data.get('address', None)
        phone = data.get('phone', None)
        dob = data.get('dob', None)

        # Prepare the dynamic update for the users table
        user_updates = []
        user_values = []

        # Check if th email field is provided and add it to the update list if so
        if email:
            user_updates.append("email = %s")
            user_values.append(email)

        # Check if the pass_hash field is provided and add it to the update list if so
        if pass_hash:
            user_updates.append("pass_hash = %s")
            user_values.append(pass_hash)
        
        # Check if the user_type field is provided and add it to the update list if so
        if user_type:
            user_updates.append("type = %s")
            user_values.append(user_type)
        
        # Check if the first_name field is provided and add it to the update list if so
        if first_name:
            user_updates.append("first_name = %s")
            user_values.append(first_name)
        
        # Check if the last_name field is provided and add it to the update list if so
        if last_name:
            user_updates.append("last_name = %s")
            user_values.append(last_name)
        
        # Check if the address field is provided and add it to the update list if so
        if address:
            user_updates.append("address = %s")
            user_values.append(address)
        
        # Check if the phone field is provided and add it to the update list if so
        if phone:
            user_updates.append("phone = %s")
            user_values.append(phone)
        
        # Check if the dob field is provided and add it to the update list if so
        if dob:
            user_updates.append("dob = %s")
            user_values.append(dob)

        # Only update users if there are fields to update
        if user_updates:
            user_update_query = f"UPDATE users SET {', '.join(user_updates)} WHERE id = %s"
            user_values.append(user_id)
            cursor.execute(user_update_query, user_values)

        # Filter incoming data based on available columns for client_info
        client_info_data = {key: value for key, value in data.items() if key in available_columns}

        # This section constructs and executes a dynamic SQL UPDATE query to update fields in the client_info table.
        # It checks if there are fields to update, builds the SQL query based on provided data, 
        # and includes the user_id to target the specific record.
        if client_info_data:
            client_info_updates = ', '.join(f"{key} = %s" for key in client_info_data.keys())
            client_info_values = list(client_info_data.values())

            query = f"UPDATE client_info SET {client_info_updates} WHERE user_id = %s"
            client_info_values.append(user_id)
            cursor.execute(query, client_info_values)

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cursor.close()

        # Return a success message
        return jsonify({"message": "Client updated successfully", "user_id": user_id}), 200

    except Exception as e:
        conn.rollback()  # Rollback the transaction if there's an error
        return jsonify({"error": str(e)}), 500

@app.route('/add_question', methods=['POST'])
def add_question():
    data = request.get_json()
    new_column_name = data.get('new_column_name')  # Get the new column name from the request
    question_text = data.get('question')  # Get the question text
    question_type = data.get('type')  # Get the question type

    if not new_column_name or not question_text or not question_type:
        return jsonify({"error": "Missing required fields: new_column_name, question, or type"}), 400

    try:
        cursor = conn.cursor()

        # Step 1: Add a new column to the client_info table

        # Step 2: Insert the corresponding question record
        insert_question_query = """
        INSERT INTO questions (question, client_field_name, type)
        VALUES (%s, %s, %s);
        """
        cursor.execute(insert_question_query, (question_text, new_column_name, question_type))

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cursor.close()

        return jsonify({"message": "Question added and question inserted successfully."}), 201

    except Exception as e:
        conn.rollback()  # Rollback the transaction if there's an error
        return jsonify({"error": str(e)}), 500
    
           

@app.route('/add_column', methods=['PUT'])
def add_column():
    data = request.get_json()
    new_column_name = data.get('new_column_name')  # Get the new column name from the request
    if not new_column_name:
        return jsonify({"error": "Missing required fields: new_column_name"}), 400

    try:
        cursor = conn.cursor()

        # Step 1: Add a new column to the client_info table

        # Step 2: Insert the corresponding question record
        alter_table_query = f"ALTER TABLE client_info ADD COLUMN {new_column_name} VARCHAR(255);"
        cursor.execute(alter_table_query)

        # Commit the transaction
        conn.commit()

        # Close the cursor
        cursor.close()

        return jsonify({"message": "Column added and question inserted successfully."}), 201

    except Exception as e:
        conn.rollback()  # Rollback the transaction if there's an error
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Get user input from the request body
        user_input = request.json.get("message", "")
        if not user_input:
            return jsonify({"error": "Message is required"}), 400
        # Check if there's a conversation history; if not, initialize it
        if 'conversation' not in session:
            session['conversation'] = []
            # Add a system message at the beginning of the conversation
            session['conversation'].append({
                "role": "system",
                "content": "You are a helpful assistant specialized in providing health advice for women dealing with prenatal and postnatal care."
            })
        # Append user's message to the conversation history
        session['conversation'].append({"role": "user", "content": user_input})
        # Prepare messages for the conversation
        messages = session['conversation']
        # Make API request to OpenAI using ChatCompletion
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        # Extract the assistant's reply
        assistant_reply = response['choices'][0]['message']['content']
        # Append assistant's reply to the conversation history
        session['conversation'].append({"role": "assistant", "content": assistant_reply})
        # Return the reply as a JSON response
        return jsonify({"reply": assistant_reply}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# Route to clear the conversation history (useful if you want to reset the conversation)
@app.route("/reset", methods=["POST"])
def reset_conversation():
    session.pop('conversation', None)
    return jsonify({"message": "Conversation reset"}), 200

if __name__ == '__main__':
    app.run(debug=True)