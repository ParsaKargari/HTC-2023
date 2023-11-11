from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from botocore.exceptions import ClientError

app = Flask(__name__)
CORS(app)

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    region_name='ca-central-1',
    aws_access_key_id='AKIAZ5K6T5DY37M2F6J5',
    aws_secret_access_key='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'
)
table_name = 'UserTable'

# Create Table in DynamoDB
def create_table():
    try:
        table = dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    'AttributeName': 'user_id',
                    'KeyType': 'HASH'  # Partition key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'user_id',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 10,
                'WriteCapacityUnits': 10
            }
        )
        table.wait_until_exists()  # Wait for table creation
        print("Table created successfully.")
    except ClientError as e:
        print(f"Error creating table: {e}")

# Uncomment the below line to create the table. Run once.
# create_table()

# Add Test Data
@app.route('/add_test_data', methods=['POST'])
def add_test_data():
    table = dynamodb.Table(table_name)
    test_items = [
        {'user_id': '1', 'username': 'UserOne', 'info': 'Some info about User One'},
        {'user_id': '2', 'username': 'UserTwo', 'info': 'Some info about User Two'}
    ]

    for item in test_items:
        try:
            table.put_item(Item=item)
        except ClientError as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Test data added successfully"}), 201

# Other routes here...

if __name__ == '__main__':
    # Run the app on all interfaces on port 8628
    create_table()
    app.run(debug=True, host='0.0.0.0', port=8628)
