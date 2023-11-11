from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from botocore.exceptions import ClientError
import cloudinary
import cloudinary.uploader
# Random UUID generator
import uuid

app = Flask(__name__)
CORS(app)

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    region_name='ca-central-1',
    aws_access_key_id='AKIAZ5K6T5DY37M2F6J5',
    aws_secret_access_key='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'
)
table1_name = 'UserTable'
table2_name = 'ImageTable'

cloudinary.config(
    cloud_name="dlb4j1jyd",
    api_key="911761227391725",
    api_secret="GD-qbQ3hupMF5Sh1peNGy8JZXlY"
)

# Create Table in DynamoDB


def create_tables():
    try:
        table = dynamodb.create_table(
            TableName=table2_name,
            KeySchema=[
                {
                    'AttributeName': 'UUID',
                    'KeyType': 'HASH'  # Partition key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'UUID',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table.wait_until_exists()  # Wait for table creation
        print("Table 2 created successfully.")
    except ClientError as e:
        print(f"Error creating table: {e}")
    
    try:
        table = dynamodb.create_table(
            TableName=table1_name,
            KeySchema=[
                {
                    'AttributeName': 'email',
                    'KeyType': 'HASH'  # Partition key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'email',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        )
        table.wait_until_exists()  # Wait for table creation
        print("Table 1 created successfully.")
    except ClientError as e:
        print(f"Error creating table: {e}")



# Upload image to Cloudinary
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image found"}), 400

    image = request.files['image']

    if image.filename == '':
        return jsonify({"error": "No image found"}), 400

    try:
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result.get('url')

        return jsonify({"image_url": image_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Helper function to upload image to Cloudinary


def upload_image_to_cloudinary(image_file):
    try:
        upload_result = cloudinary.uploader.upload(image_file)
        return upload_result.get('url')
    except Exception as e:
        return None


# Add user to DynamoDB table 1
@app.route('/login_user', methods=['POST'])
def login_user():
    # Extracting text fields from request.form, not request.json
    email = request.form.get('email')

    # Construct user data
    user_data = {
        'email': email,
        'buy_count': 3,
    }

    # Add user to DynamoDB table
    try:
        table = dynamodb.Table(table1_name)

        # Check if user exists, if not, add user
        response = table.get_item(Key={'email': email})
        print(response)
        if 'Item' not in response:
            table.put_item(Item=user_data)
            return jsonify({"message": "User added successfully"}), 200
        else:
            return jsonify({"message": "User already exists"}), 200
        
    except ClientError as e:
        return jsonify({"error": str(e)}), 500

# Add user to DynamoDB table 2
@app.route('/add_user', methods=['POST'])
def add_user():
    # Extracting text fields from request.form, not request.json
    email = request.form.get('email')
    name = request.form.get('name')
    info = request.form.get('info')
    image_file = request.files.get('image')

    # Upload image and get URL
    image_url = upload_image_to_cloudinary(image_file) if image_file else None

    # Generate UUID
    user_uuid = str(uuid.uuid4())

    # Construct user data
    user_data = {
        'UUID': user_uuid,
        'Email': email,
        'Name': name,
        'Info': info,
        'ImageURL': image_url
    }

    # Add user to DynamoDB table
    try:
        table = dynamodb.Table(table2_name)
        table.put_item(Item=user_data)
        return jsonify({"message": "User added successfully", "UUID": user_uuid}), 200
    except ClientError as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Run the app on all interfaces on port 8628
    # Uncomment the below line to create the table. Run once.
    # create_tables()
    app.run(debug=True, host='0.0.0.0', port=8628)
