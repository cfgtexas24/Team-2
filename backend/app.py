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
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
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
    
@app.route('/questions', methods=['GET'])
def get_questions():
    try:
        # Connect to the database
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

        # Return the questions in JSON format
        return jsonify(questions)

    except Exception as error:
        return jsonify({"error": str(error)})
    
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

        print(session['conversation'])
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