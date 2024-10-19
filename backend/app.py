from flask import Flask, request, jsonify, session
import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv
from pathlib import Path
import openai


app = Flask(__name__)

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
    data = request.get_json()  # Get the JSON data from the request
    
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

        if email:
            user_updates.append("email = %s")
            user_values.append(email)
        if pass_hash:
            user_updates.append("pass_hash = %s")
            user_values.append(pass_hash)
        if user_type:
            user_updates.append("type = %s")
            user_values.append(user_type)
        if first_name:
            user_updates.append("first_name = %s")
            user_values.append(first_name)
        if last_name:
            user_updates.append("last_name = %s")
            user_values.append(last_name)
        if address:
            user_updates.append("address = %s")
            user_values.append(address)
        if phone:
            user_updates.append("phone = %s")
            user_values.append(phone)
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

        # If there are fields to update for client_info, construct the dynamic update query
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

        return jsonify({"message": "Client updated successfully", "user_id": user_id}), 200

    except Exception as e:
        conn.rollback()  # Rollback the transaction if there's an error
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)