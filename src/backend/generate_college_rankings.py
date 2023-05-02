import csv
from us_news_scraper import get_top_colleges
import os

urls = {
    "Technology" :
        "https://www.usnews.com/best-colleges/rankings/computer-science",
    "Engineering" :
        "https://www.usnews.com/best-colleges/rankings/engineering-doctorate",
    "Finance" :
        "https://www.usnews.com/best-colleges/rankings/business",
    "Social Sciences" :
        "https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges",
    "Arts" :
        "https://www.usnews.com/best-colleges/rankings/specialty-arts",
    "Science" :
        "https://www.usnews.com/best-colleges/nursing",
    "Overall" :
        "https://www.usnews.com/best-colleges/rankings/national-universities"
}
mix_fields = {
    "Mathematics" : ["Technology", "Overall"],
    "Humanities" : ["Arts", "Social Sciences"],
    "Natural Sciences" : ["Social Sciences", "Science"],
    "Marketing" : ["Finance", "Social Sciences"],
    "Hospitality" : ["Finance", "Arts"],
    "Management" : ["Finance", "Overall"]
}
field_names = [
    'displayName', 'rankingSortRank', # DO NOT CHANGE THE FIRST TWO ENTRIES
    'primaryPhotoThumb', 'location', 'aliasNames'
]

def __make_dir(dir_name):
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    return os.getcwd()
def __write_base_csv_files(curr_dir, folder_name, num_colleges):
    os.chdir(f"{curr_dir}/{folder_name}")
    for subject, url in urls.items():
        with open(f"{subject}.csv", 'w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=field_names)
            writer.writeheader()
            for college in get_top_colleges(url, num_colleges):
                writer.writerow({
                    field:college[field] for field in field_names
                })
    os.chdir(curr_dir)
def __combine_files(mixers):
    data_dict = {}
    for mix in mixers:
        with open(f"{mix}.csv", "r", newline='') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['displayName'] in data_dict:
                    data_dict[row['displayName']]['rank'].append(int(row['rankingSortRank']))
                else:
                    data_dict[row['displayName']] = {'rank': [int(row['rankingSortRank'])]}
                    for field in field_names[2:]:
                        data_dict[row['displayName']][field] = row[field]
    return data_dict
def __write_mix_csv_files(curr_dir, folder_name):
    os.chdir(f"{curr_dir}/{folder_name}")
    for subject, mixers in mix_fields.items():
        data_dict = __combine_files(mixers)
        for college in data_dict.values():
            college['rankingSortRank'] = sum(college['rank'])//len(college['rank'])
            del college['rank']
        colleges = sorted([college for college in data_dict.items()], \
            key=lambda arr:arr[1]['rankingSortRank'])

        with open(f"{subject}.csv", 'w', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=field_names)
            writer.writeheader()
            for college in colleges:
                college[1]['displayName'] = college[0]
                writer.writerow(college[1])
    os.chdir(curr_dir)
def write_csv_rank_files(num_colleges, folder_name):
    curr_dir = __make_dir(folder_name)

    __write_base_csv_files(curr_dir, folder_name, num_colleges)
    __write_mix_csv_files(curr_dir, folder_name)

if __name__ == "__main__":
    write_csv_rank_files(1, folder_name='college_data')
