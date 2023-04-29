import requests
import urllib.request
from urllib.parse import urlparse, parse_qs

def __get_headers():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }

    return headers
def __get_base_url():
    return "https://www.usnews.com/best-colleges/api/search"
def __extract_parameters_from_url(url):
    parsed_url = urlparse(url)

    location = parsed_url.path.split("/")[2:]
    local_params = {}
    if location[-1] != "rankings":
        local_params['schoolType'] = location[-1]

    querie_params = dict(parse_qs(parsed_url.query))

    return {**local_params, **querie_params}
def __read_site_page_count(url, params, headers):
    params['_page'] = "1"

    req = requests.get(url=url, params=params, headers=headers)
    json_req = req.json()

    # Return the list of schools
    return json_req['data']['total_pages']
def __read_college_page(url, page_count, params, headers, num_colleges):
    colleges = []
    tmpRank = 1
    for page in range(1, page_count+1):
        params["_page"] = str(page)

        req = requests.get(url=url, params=params, headers=headers)
        req_json = req.json()

        for college in req_json['data']['items']:
            # Stop parsing after free content ends
            if college['institution']['rankingSortRank'] == -1:
                return colleges

            # Adjust for undefined ranks
            elif college['institution']['rankingSortRank'] == -2:
                college['institution']['rankingSortRank'] = tmpRank
                tmpRank += 1
            colleges.append(college['institution'])

        if len(colleges) >= num_colleges:
            return colleges

    return colleges
def get_top_colleges(url, num_colleges):
    headers = __get_headers()
    params = __extract_parameters_from_url(url)
    base_url = __get_base_url()
    page_count = __read_site_page_count(base_url, params, headers)
    read_site = __read_college_page(base_url, page_count, params, headers, num_colleges)
    return read_site

if __name__ == "__main__":
    # Best computer science
    # url = "https://www.usnews.com/best-colleges/rankings/computer-science"

    # Best engineering
    # url = "https://www.usnews.com/best-colleges/rankings/engineering-doctorate"

    # Best business
    # url = "https://www.usnews.com/best-colleges/rankings/business"

    # Best liberal arts
    # url = "https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges"

    # Best arts
    # url = "https://www.usnews.com/best-colleges/rankings/specialty-arts"

    # Best nursing
    # url = "https://www.usnews.com/best-colleges/nursing"

    # Overall top colleges
    url = "https://www.usnews.com/best-colleges/rankings/national-universities"

    headers = __get_headers()
    params = __extract_parameters_from_url(url)
    base_url = __get_base_url()
    page_count = __read_site_page_count(base_url, params, headers)
    read_site = __read_college_page(base_url, page_count, params, headers, 3)
    print([site['displayName'] for site in read_site])

