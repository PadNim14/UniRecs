import os
import csv
from numpy import dot
from parse_dict import parse_user_dict_sort
from generate_college_rankings import write_csv_rank_files, urls, mix_fields

fields = [field for field in {**urls, **mix_fields}]

class Similarities:
    def __init__(self, data):
        self.user = self.__make_user_point(data.get_user())
        self.colleges = self.__make_college_points(data.get_user(), data.get_colleges())
    def __make_user_point(self, user):
        return tuple(val for _, val in user)
    def __make_college_points(self, user, colleges):
        return {
            college:tuple(
                subject[field] if field in subject.keys() \
                else 0 for field, _ in user
            ) for college, subject in colleges.items()
        }
    def cosine_similarity(self):
        return [
            (college, dot(self.user, val)) for \
            college, val in self.colleges.items()
        ]
    def distance_similarity(self):
        return [
            (college, sum((user_val-val)**2 for user_val, val in \
            zip(self.user, college_val))) for college, college_val in \
            self.colleges.items()
        ]
    def weighted_similarity(self, cos_arr, dist_arr, cos_weight=1, dist_weight=1):
        return [(cos_val[0], cos_val[1]*cos_weight+dist_val[1]*dist_weight) \
            for cos_val, dist_val in zip(cos_arr, dist_arr)]

class DataSet:
    def __init__(self, user, colleges):
        self.__user = self.__parse_and_norm_user_interests(user)
        self.__colleges = self.__parse_and_norm_colleges(colleges)
    def __parse_and_norm_colleges(self, colleges):
        college_dict = {}
        for field, _ in self.__user:
            field_max = colleges[field][-1][1]
            for college, val in colleges[field]:
                if college not in college_dict:
                    college_dict[college] = \
                        {field:(field_max-val+1)/field_max}
                else:
                    college_dict[college][field] = \
                        (field_max-val+1)/field_max
        return college_dict
    def __user_weight_adjust(self, user):
        remove_list = []
        for field, weights in user.items():
            if weights['Weight'] == 0:
                remove_list.append(field)
        for field in user.values():
            del field['Weight']

        for field in remove_list:
            del user[field]
    def __assemble_user_data(self, user_data):
        return user_data
    def __parse_and_norm_user_interests(self, user_data):
        user = self.__assemble_user_data(user_data)
        self.__user_weight_adjust(user)
        user_list = parse_user_dict_sort(user)
        max_weight = user_list[0][1]
        return [(user_val[0], user_val[1]/max_weight) for user_val in user_list]
    def get_colleges(self):
        return self.__colleges
    def get_user(self):
        return self.__user

def __create_college_dict(num_colleges):
    folder_name = 'college_data'

    # Make sure data is populated
    if not os.path.exists(folder_name):
        write_csv_rank_files(num_colleges, folder_name=folder_name)

    field_dict = {}
    for field in fields:
        with open(f"{folder_name}/{field}.csv", "r", newline='') as file:
            reader = csv.DictReader(file)
            field_dict[field] = [(row['displayName'], \
                int(row['rankingSortRank'])) for row in reader]
    return field_dict

if __name__ == "__main__":
    user = {
        "Liberal Arts":{
            "Weight":2,
            "Humanities":1,
            "Social Sciences":0,
            "Arts":3,
            "Natural Sciences":5
        },
        "Business":{
            "Weight":0,
            "Finance":0,
            "Marketing":0,
            "Hospitality":0,
            "Management":1
        },
        "STEM":{
            "Weight":2,
            "Engineering":0,
            "Technology":3,
            "Science":0,
            "Mathematics":9
        }
    }
    colleges = __create_college_dict(1)
    data = DataSet(user, colleges)
    sims = Similarities(data)
    cos_sim = sims.cosine_similarity()
    dist_sim = sims.distance_similarity()
    weighted_sim = sims.weighted_similarity(cos_arr=cos_sim, \
        dist_arr=dist_sim, cos_weight=9, dist_weight=1)
    recs = [
        college for college, _ in \
        sorted(weighted_sim, key=lambda tup:tup[1], reverse=True)
    ]
    for idx, rec in enumerate(recs):
        print(f"{idx+1}\t{rec}")
