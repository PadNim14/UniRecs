import requests
import urllib.request
from urllib.parse import urlparse, parse_qs

def __get_headers():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }

    return headers
def __extract_parameters_from_url(url):
    parsed_url = urlparse(url)

    querie_params = dict(parse_qs(parsed_url.query))

    location = parsed_url.path.split("/")[2:]
    querie_params["schoolType"] = location[1]

    return querie_params
def __read_site_page_count(url, params, headers):
    params['_page'] = "1"

    req = requests.get(url=url, params=params, headers=headers)
    json_req = req.json()

    # Return the list of schools
    return json_req['data']['total_pages']
def __read_college_page(url, page_count, params, headers):
    colleges = []
    for page in range(1, page_count+1):
        params["_page"] = str(page)

        req = requests.get(url=url, params=params, headers=headers)
        req_json = req.json()

        for college in req_json['data']['items']:
            colleges.append(college['institution'])

        if len(colleges) >= 100:
            break

    return colleges
def __get_base_url():
    return "https://www.usnews.com/best-colleges/api/search"

url = "https://www.usnews.com/best-colleges/rankings/engineering-doctorate?_sort=rank&_sortDirection=asc"
headers = __get_headers()
params = __extract_parameters_from_url(url)
base_url = __get_base_url()
page_count = __read_site_page_count(base_url, params, headers)
read_site = __read_college_page(base_url, page_count, params, headers)
for idx, item in enumerate(read_site):
    print(f"{idx+1}) {item['displayName']}")
