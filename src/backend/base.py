from flask import Flask, jsonify, request
import backend_caller as backend
app = Flask(__name__)

@app.route('/recs', methods=['POST', 'GET'])
def show_recommendations():
    response = request.json
    if response is not None:
        recs = backend.make_rec(response['userId'])
        for num, college in enumerate(recs[:10]):
            print(f"{num+1})\t{college['name']}, {college['data']['aliasNames']}")
        return jsonify(recs[:10])
    
    print("Backend unable to get user ID")
    return {'name': "No results found"}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)