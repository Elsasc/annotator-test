from flask import Flask, request, send_file
from flask_cors import CORS
import os
import modify_pdf

app = Flask(__name__)
CORS(app)  # Enable CORS so your frontend (on a different domain) can make requests

# Directories to store uploaded and output files
uploads_dir = os.path.join(os.getcwd(), 'uploads')
outputs_dir = os.path.join(os.getcwd(), 'outputs')
os.makedirs(uploads_dir, exist_ok=True)
os.makedirs(outputs_dir, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload():
    if 'pdf' not in request.files:
        return "No PDF file provided.", 400

    file = request.files['pdf']
    if file.filename == '':
        return "No selected file.", 400

    input_path = os.path.join(uploads_dir, file.filename)
    file.save(input_path)
    output_filename = 'modified-' + file.filename
    output_path = os.path.join(outputs_dir, output_filename)

    try:
        # Call annotator
        modify_pdf.modify_pdf(input_path, output_path)
    except Exception as e:
        return f"Error processing PDF: {str(e)}", 500

    # Return the modified PDF for download
    return send_file(output_path, as_attachment=True, download_name=output_filename)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
