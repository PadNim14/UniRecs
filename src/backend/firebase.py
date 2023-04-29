import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("unirecs-787f9-firebase-adminsdk-xuw4v-c1ea8e1dfd.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

quiz_res = db.collection(u'quizResponses')
docs = quiz_res.get()

if __name__ == "__main__":
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
