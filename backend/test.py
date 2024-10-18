import psycopg2
import os
from dotenv import load_dotenv
from pathlib import Path
from flask import Flask, jsonify

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



if __name__ == '__main__':
    app.run(debug=True)