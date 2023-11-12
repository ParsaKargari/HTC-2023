import os
from decouple import config
from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from botocore.exceptions import ClientError
import cloudinary
import cloudinary.uploader
# Random UUID generator
import uuid
from openai import OpenAI


app = Flask(__name__)
# Load environment variables from .env file
app.config['OPENAI_API_KEY'] = config('OPENAI_API_KEY')
app.config['AWS_ACCESS_KEY_ID'] = config('AWS_ACCESS_KEY_ID')
app.config['AWS_SECRET_ACCESS_KEY'] = config('AWS_SECRET_ACCESS_KEY')
app.config['CLOUDINARY_CLOUD_NAME'] = config('CLOUDINARY_CLOUD_NAME')
app.config['CLOUDINARY_API_KEY'] = config('CLOUDINARY_API_KEY')
app.config['CLOUDINARY_API_SECRET'] = config('CLOUDINARY_API_SECRET')

client = OpenAI(
    api_key=app.config['OPENAI_API_KEY']
)
CORS(app)

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    region_name='ca-central-1',
    aws_access_key_id=app.config['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=app.config['AWS_SECRET_ACCESS_KEY']
)

cloudinary.config(
    cloud_name=app.config['CLOUDINARY_CLOUD_NAME'],
    api_key=app.config['CLOUDINARY_API_KEY'],
    api_secret=app.config['CLOUDINARY_API_SECRET']
)

table1_name = 'UserTable'
table2_name = 'ImageTable'

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

# Confirm image with OpenAI


def confirm_image(link):
    print("Confirming image")
    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "True or False? Is this image showing child's clothing? Please answer with 'True' or 'False'."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": link,
                        },
                    },
                ],
            }
        ],
        max_tokens=50,
    )
    answer = response.choices[0].message.content.lower()

    if answer == "true":
        return True
    else:
        return False

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
    picture = request.form.get('picture')

    # Construct user data
    user_data = {
        'email': email,
        'picture': picture,
        'buy_count': 3,
        'sell_count': 0,
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


@app.route('/add_listing', methods=['POST'])
def add_user():
    # Extracting text fields from request.form, not request.json
    email = request.form.get('email')
    name = request.form.get('name')
    info = request.form.get('info')
    image_file = request.files.get('image')
    size = request.form.get('size')
    phone = request.form.get('phone')

    # Upload image and get URL
    image_url = upload_image_to_cloudinary(image_file) if image_file else None

    # Confirm image
    if image_url:
        if not confirm_image(image_url):
            return jsonify({"error": "Image is not child's clothing"}), 400
    else:
        return jsonify({"error": "No image found"}), 400

    # Generate UUID
    user_uuid = str(uuid.uuid4())

    # Construct user data
    user_data = {
        'UUID': user_uuid,
        'Email': email,
        'Name': name,
        'Info': info,
        'ImageURL': image_url,
        'Size': size,
        'Phone': phone,
    }

    # Add user to DynamoDB table
    try:
        table = dynamodb.Table(table2_name)
        table.put_item(Item=user_data)

        # Increase sell count by 1, from table 1 and check if user gets free listing
        table = dynamodb.Table(table1_name)
        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            table.update_item(
                Key={
                    'email': email
                },
                UpdateExpression="set sell_count = sell_count + :val",
                ExpressionAttributeValues={
                    ':val': 1
                },
                ReturnValues="UPDATED_NEW"
            )
            current_sell_count = response['Item']['sell_count']
            if (current_sell_count + 1) % 2 == 0:
                table.update_item(
                    Key={
                        'email': email
                    },
                    UpdateExpression="set buy_count = buy_count + :val",
                    ExpressionAttributeValues={
                        ':val': 1
                    },
                    ReturnValues="UPDATED_NEW"
                )
        return jsonify({"message": "User added successfully", "UUID": user_uuid}), 200
    except ClientError as e:
        return jsonify({"error": str(e)}), 500

# Implement Buy


@app.route('/buy', methods=['POST'])
def buy():
    # Delete Column from DynamoDB table 2, associated with UUID
    # Reduce buy count by 1, from table 1
    email = request.form.get('email')
    ImageUUID = request.form.get('UUID')
    try:
        table = dynamodb.Table(table2_name)
        response = table.get_item(Key={'UUID': ImageUUID})
        if 'Item' in response:
            table.delete_item(Key={'UUID': ImageUUID})
        # Reduce buy count by 1, from table 1
        table = dynamodb.Table(table1_name)
        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            table.update_item(
                Key={
                    'email': email
                },
                UpdateExpression="set buy_count = buy_count - :val",
                ExpressionAttributeValues={
                    ':val': 1
                },
                ReturnValues="UPDATED_NEW"
            )
        return jsonify({"message": "Buy successfully"}), 200
    except ClientError as e:
        return jsonify({"error": str(e)}), 500


# Get all listings from DynamoDB table 2
@app.route('/get_listings_t2', methods=['GET'])
def get_listings_t2():
    try:
        table = dynamodb.Table(table2_name)
        response = table.scan()
        return jsonify(response['Items']), 200
    except ClientError as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_listings_t1', methods=['GET'])
def get_listings_t1():
    try:
        table = dynamodb.Table(table1_name)
        response = table.scan()
        return jsonify(response['Items']), 200
    except ClientError as e:
        return jsonify({"error": str(e)}), 500


@app.route('/call_gpt', methods=['GET'])
def call_gpt():
    answer = confirm_image(
        "https://images-na.ssl-images-amazon.com/images/I/917zFbZhopL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg")
    return jsonify({"answer": answer}), 200


if __name__ == '__main__':
    # Run the app on all interfaces on port 8628
    # Uncomment the below line to create the table. Run once.
    # create_tables()
    app.run(debug=True, host='0.0.0.0', port=8628)
