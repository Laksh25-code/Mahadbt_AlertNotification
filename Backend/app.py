from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from twilio.rest import Client
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allows requests from any origin
  # Allow React frontend to communicate with Flask backend

# Load environment variables
load_dotenv()

# Twilio Credentials (Replace with actual credentials)
TWILIO_ACCOUNT_SID = os.getenv("")
TWILIO_AUTH_TOKEN = os.getenv("")
TWILIO_SMS_NUMBER = os.getenv("")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Dummy Admin Credentials (Replace with DB in real system)
ADMIN_USERNAME = "Admin"
ADMIN_PASSWORD = "Pass123"

# Temporary storage for student data (Use database in production)
students_data = []

#######################################################
@app.route("/api/login", methods=["POST"])
def login():
    """Handles admin login"""
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

############################################################
@app.route("/api/upload", methods=["POST"])
def upload_file():
    """Handles file upload and extracts student data"""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not file.filename.endswith((".xls", ".xlsx")):
        return jsonify({"error": "Invalid file format. Only Excel files are allowed"}), 400

    try:
        df = pd.read_excel(file)

        # Ensure required columns exist
        required_columns = {"Beneficiary Name", "Beneficiary Mobile No", "Reason", "Status"}
        if not required_columns.issubset(df.columns):
            return jsonify({"error": "Invalid file format. Missing required columns"}), 400

        # Rename columns
        column_mapping = {
            "Beneficiary Name": "student_name",
            "Beneficiary Mobile No": "phone_number",
            "Reason": "reason_for_denial",
            "Status": "application_status"
        }

        df.rename(columns=column_mapping, inplace=True)

        # Store in memory (Use DB in production)
        global students_data
        students_data = df.to_dict(orient="records")

        print("Uploaded Data:", students_data)  # Debugging print

        return jsonify({"message": "File uploaded and data stored successfully"}), 200

    except Exception as e:
        return jsonify({"error": f"Error processing file: {str(e)}"}), 500


##########################################################
@app.route("/api/students", methods=["GET"])
def get_students():
    global students_data
    print("Sending Data:", students_data)  # ✅ Debugging API response
    return jsonify(students_data)


def format_phone_number(number):
    """Ensures the phone number is in the correct format"""
    number = str(number).strip().replace(" ", "").replace("-", "")
    if not number.startswith("+91"):
        number = "+91" + number  # Add country code if missing
    return number


def send_sms(phone_number, message):
    """Sends an SMS notification"""
    try:
        msg = client.messages.create(
            body=message,
            from_=TWILIO_SMS_NUMBER,
            to=phone_number
        )
        return {"status": "success", "message": f"Sent to {phone_number}", "sid": msg.sid}
    except Exception as e:
        return {"status": "error", "message": f"Failed to send to {phone_number}: {str(e)}"}

##################################################################
@app.route('/api/send-notification', methods=['POST'])
def send_notification():
    """Handles sending notifications"""
    data = request.json
    phone_number = data.get("phone_number") or data.get("mobile")
    student_name = data.get("name", "Student")
    reason = data.get("reason", "Unknown reason")

    if not phone_number:
        return jsonify({"error": "Mobile number is missing"}), 400

    phone_number = format_phone_number(phone_number)  # Format correctly

    # Message to be sent
    message = f"Hello {student_name}, your application was denied due to: {reason}. Please fill out the required form."

    # Send SMS
    result = send_sms(phone_number, message)
    return jsonify(result), 200


if __name__ == '__main__':
    app.run(debug=True)