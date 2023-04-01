from flask import Flask
import college_major as cm
app = Flask(__name__)
@app.route('/recs', methods=['GET', 'POST'])
def show_recommendations():
    test = cm.get_similar_colleges("Harvard University")
    return str(test)

if __name__ == "__main__":
    app.run(port=5000, debug=False)