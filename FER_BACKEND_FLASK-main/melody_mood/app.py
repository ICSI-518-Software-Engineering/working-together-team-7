from flask import Flask, request, jsonify
import io
import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

def predict_emotion():
    app.logger.debug("Predict emotion called")
    if 'file' not in request.files:
        app.logger.error("No file part")
        return jsonify({'error': 'No file provided'}), 400
    file = request.files['file']
    if file.filename == '':
        app.logger.error("No selected file")
        return jsonify({'error': 'No selected file'}), 400

    try:
        in_memory_file = io.BytesIO()
        file.save(in_memory_file)
        in_memory_file.seek(0)
        app.logger.debug(f"Predicted emotion: {predicted_emotion}")
        return jsonify({'predicted_emotion': predicted_emotion})
    except Exception as e:
        app.logger.error(f"Error in prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)