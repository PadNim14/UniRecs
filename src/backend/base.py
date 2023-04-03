from flask import Flask
import college_major as cm
app = Flask(__name__)

@app.route('/recs', methods=['GET', 'POST'])
def show_recommendations():
    colleges = cm.get_similar_colleges("Harvard University")
    # form = ""
    # for col in test:
    #     form += col[0] + "\n"
    return str((colleges))



if __name__ == "__main__":
    app.run(port=5000, debug=True)