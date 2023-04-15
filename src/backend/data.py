from urllib.request import urlopen
from json import loads
import json

college_data = None
with open('college_data.json', 'r') as f:
    college_data = json.load(f)
    
url = "https://educationdata.urban.org/api/v1/college-university/ipeds/admissions-requirements/2019/"
response = urlopen(url)
data = loads(response.read())
test_scores = data['results']
# print(test_scores[0]['unitid'])
for i in range(len(college_data)):
    unitid = college_data[i].get("ipeds_id")
    # print(unitid)
    # print(unitid, test_scores[i]['unitid'])
    if unitid == test_scores[i]['unitid']:
        print("Made it here")
        
    
        

