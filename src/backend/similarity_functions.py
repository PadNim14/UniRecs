import os
import csv
from numpy import dot
from parse_dict import parse_user_dict_sort
from generate_college_rankings import write_csv_rank_files, urls, mix_fields, field_names

fields = [field for field in {**urls, **mix_fields}]

def __create_college_dict(num_colleges):
    folder_name = 'college_data'

    # Make sure data is populated
    if not os.path.exists(folder_name):
        write_csv_rank_files(num_colleges, folder_name=folder_name)

    field_dict = {}
    for field in fields:
        with open(f"{folder_name}/{field}.csv", "r", newline='', encoding='latin-1') as file:
            reader = csv.DictReader(file)
            field_dict[field] = [(row['displayName'], \
                int(row['rankingSortRank']), {field:row[field] for field in \
                field_names[2:]}) for row in reader]
    return field_dict
colleges = __create_college_dict(250)

class Similarities:
    def __init__(self, data):
        self.user = self.__make_user_point(data.get_user())
        self.colleges = self.__make_college_points(data.get_user(), data.get_colleges())
    def __make_user_point(self, user):
        return tuple(val for _, val in user)
    def __make_college_points(self, user, colleges):
        return {
            college:{'point': tuple(
                subject[field] if field in subject.keys() \
                else 0 for field, _ in user
            ),
            'data': subject['data']} for college, subject in colleges.items()
        }
    def cosine_similarity(self):
        return [
            ({'name': college, 'data': val['data']}, \
            dot(self.user, val['point'])) for \
            college, val in self.colleges.items()
        ]
    def distance_similarity(self):
        return [
            ({'name': college, 'data': college_val['data']}, \
            sum((user_val-val)**2 for user_val, val in \
            zip(self.user, college_val['point']))) for college, college_val in \
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
            for college, val, data in colleges[field]:
                if college not in college_dict:
                    college_dict[college] = \
                        {field:(field_max-val+1)/field_max}
                else:
                    college_dict[college][field] = \
                        (field_max-val+1)/field_max
                college_dict[college]['data'] = data
        return college_dict
    def __user_weight_adjust(self, user):
        remove_list = []
        for field, weights in user.items():
            if weights['weight'] == 0:
                remove_list.append(field)
        for field in user.values():
            del field['weight']

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

def __format_user_responses(user):
    user_dict = {
        "Liberal Arts":{
            "weight":0,
            "Humanities":0,
            "Social Sciences":0,
            "Arts":0,
            "Natural Sciences":0
        },
        "Business":{
            "weight":0,
            "Finance":0,
            "Marketing":0,
            "Hospitality":0,
            "Management":0
        },
        "STEM":{
            "weight":0,
            "Engineering":0,
            "Technology":0,
            "Science":0,
            "Mathematics":0
        }
    }

    for questions in [quiz['responseID'] for quiz in user]:
        answers = [answer['weight'] for answer in questions]
        for response in answers:
            for field, subsections in response.items():
                for weight, value in subsections.items():
                    user_dict[field][weight] += value

    return user_dict

def make_user_recs(user):
    user = __format_user_responses(user)
    data = DataSet(user, colleges)
    sims = Similarities(data)
    cos_sim = sims.cosine_similarity()
    dist_sim = sims.distance_similarity()
    weighted_sim = sims.weighted_similarity(cos_arr=cos_sim, \
        dist_arr=dist_sim, cos_weight=7, dist_weight=3)

    recs = [
        college for college, _ in \
        sorted(weighted_sim, key=lambda tup:tup[1], reverse=True)
    ]
    return recs

if __name__ == "__main__":
    user = {
        "Liberal Arts":{
            "weight":2,
            "Humanities":1,
            "Social Sciences":0,
            "Arts":3,
            "Natural Sciences":5
        },
        "Business":{
            "weight":0,
            "Finance":0,
            "Marketing":0,
            "Hospitality":0,
            "Management":1
        },
        "STEM":{
            "weight":2,
            "Engineering":1,
            "Technology":3,
            "Science":0,
            "Mathematics":9
        }
    }
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
    for idx, rec in enumerate(recs[:10]):
        print(f"{idx+1}\t{rec}")
