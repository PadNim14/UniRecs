from collections import ChainMap
def parse_user_dict_sort(dictionary):
    # Parse filds out of dictionary if their value is zero
    return sorted([val for val in dict(ChainMap(*[
        {field:dictionary[genus][field] for field in dictionary[genus]
        if dictionary[genus][field] != 0} for genus in dictionary
    ])).items()], key=lambda tup:tup[1], reverse=True)

if __name__ == "__main__":
    user = {
        "Liberal Arts":{
            "Weight":1,
            "Field 1":1,
            "Field 2":0
        },
        "STEM":{
            "Weight":0,
            "Field 3":0,
            "Field 4":3,
            "Field 5":0,
            "Field 6":9
        }
    }
    parsedDict = parse_user_dict_sort(user)
    print(parsedDict)
