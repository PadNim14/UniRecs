from firebase import get_user_data
from similarity_functions import make_user_recs

if __name__ == "__main__":
    user_id = "Ilp1CPwB7nNN0MsAparujOmXYeE3"
    user = get_user_data(user_id)
    user_data = [question.to_dict() for question in user]
    recs = make_user_recs(user_data)
    for idx, rec in enumerate(recs[:25]):
        print(f"{idx+1})\t{rec}")
