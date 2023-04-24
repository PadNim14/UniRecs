from flask import Flask, jsonify
import college_major as cm
app = Flask(__name__)

@app.route('/recs', methods=['GET', 'POST'])
def show_recommendations():
    colleges = cm.get_similar_colleges("Cornell University")
    return jsonify(colleges)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)