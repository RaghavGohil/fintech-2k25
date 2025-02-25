# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy prediction function for demonstration.
# Replace this with your actual model prediction code.
def dummy_predict(features: dict) -> int:
    """
    A dummy prediction function.
    For example, we use the error value (a numeric value) to decide:
    If error > 15, predict fraud (1), otherwise not fraud (0).
    """
    try:
        error = float(features.get('error', 0))
    except Exception:
        error = 0.0

    # A simple rule: if the error code is high, consider it fraudulent.
    if error > 15:
        return 1  # Fraud detected
    else:
        return 0  # Not fraud

@app.route('/predict', methods=['POST'])
def predict():
    # Expecting JSON data from the Next.js app
    data = request.get_json(force=True)
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # Extract features from the incoming JSON data.
    # Expected keys: month, day, time, amount, useChip, merchantName,
    # merchantCity, merchantState, zip, mcc, and error.
    features = {
        'month': data.get('month', 0),
        'day': data.get('day', 0),
        'time': data.get('time', ''),
        'amount': data.get('amount', 0),
        'useChip': data.get('useChip', ''),
        'merchantName': data.get('merchantName', ''),
        'merchantCity': data.get('merchantCity', ''),
        'merchantState': data.get('merchantState', ''),
        'zip': data.get('zip', ''),
        'mcc': data.get('mcc', ''),
        'error': data.get('error', 0)
    }

    # Run prediction (here using the dummy_predict function)
    prediction = dummy_predict(features)

    # Return the prediction result as JSON.
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    # Run the server on port 5000 and make it accessible from any host.
    app.run(debug=True, host='0.0.0.0', port=5000)
