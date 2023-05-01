import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("unirecs-787f9-firebase-adminsdk-xuw4v-c1ea8e1dfd.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def get_user_data(user_id):
    try:
        from google.cloud.firestore_v1.base_query import FieldFilter
        query = db.collection('quizResponses').where(filter=FieldFilter("userId", "==", user_id))
    except:
        query = db.collection('quizResponses').where("userId", "==", user_id)
    return query.get()

if __name__ == "__main__":
    quiz_res = db.collection(u'quizResponses')
    docs = quiz_res.get()[0]

    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')

