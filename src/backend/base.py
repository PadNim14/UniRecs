from flask import Flask, jsonify
import backend_caller as backend
app = Flask(__name__)

@app.route('/recs', methods=['GET', 'POST'])
def show_recommendations():
    # colleges = cm.get_similar_colleges("Cornell University")
    # print(colleges)
    recs = backend.make_rec("Ilp1CPwB7nNN0MsAparujOmXYeE3")
    return jsonify(recs)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)