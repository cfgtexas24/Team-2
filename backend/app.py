from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv
from pathlib import Path

app = Flask(__name__)

# Load environment variables from .env in the parent directory
env_path = Path('..') / '.env'
load_dotenv(dotenv_path=env_path)

# Database connection parameters
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

        conn.close()

        # Return the questions in JSON format
        return jsonify(questions)

    except Exception as error:
        return jsonify({"error": str(error)})
    
# route to return a single client by id
@app.route('/client/<int:id>', methods=['GET'])
def get_client(id):
    try:
        # Establish the database connection (use connect_db function as in the previous solution)
        cursor = conn.cursor()

        # Use a LEFT JOIN to fetch data from both tables in a single query
        query = """
        SELECT u.id, u.email, u.first_name, u.last_name, u.address, u.phone, u.dob,
               c.emergency_contact, c.homelessness, c.depression, c.employment_status, 
               c.dependencies, c.pregnancy_start
        FROM users u
        LEFT JOIN client_info c ON u.id = c.user_id
        WHERE u.id = %s;
        """
        
        # Execute the combined query
        cursor.execute(query, (id,))
        data = cursor.fetchone()
        print(f"Data fetched: {data}")

        if not data:
            return jsonify({"error": "User not found"}), 404  # Explicitly return 404 if no user found

        # Prepare the response with both user and client_info data
        response = {
            "user": {
                "id": data[0],
                "email": data[1],
                "first_name": data[2],
                "last_name": data[3],
                "address": data[4],
                "phone": data[5],
                "dob": data[6]
            },
            "client_info": "No client information available" if data[7] is None else {
                "emergency_contact": data[7],
                "homelessness": data[8],
                "depression": data[9],
                "employment_status": data[10],
                "dependencies": data[11],
                "pregnancy_start": data[12]
            }
        }

        cursor.close()

        return jsonify(response), 200  # Return a 200 status code

    except Exception as error:
        print(f"Error occurred: {error}")
        return jsonify({"error": str(error)}), 500  # Return 500 for server errors

if __name__ == '__main__':
    app.run(debug=True)