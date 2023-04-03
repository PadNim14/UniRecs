import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the college data from the CSV file
college_data = pd.read_csv('collegemajor.csv')

# Create a TF-IDF vectorizer to convert the college names to vectors
vectorizer = TfidfVectorizer()

# Compute the TF-IDF feature matrix for the college names
feature_matrix = vectorizer.fit_transform(college_data['college'])

# Compute the cosine similarity matrix for the feature matrix
cosine_sim_matrix = cosine_similarity(feature_matrix)

# Define a function to get the top n similar colleges for a given college
def get_similar_colleges(college, n=10):
    # Get the index of the given college
    
    college_index = college_data.index[college_data['college'] == college].tolist()[0]

    top_n_colleges = []
    # Compute the cosine similarity scores for all colleges
    cosine_sim_scores = list(enumerate(cosine_sim_matrix[college_index]))

    # Sort the colleges by their cosine similarity scores
    sorted_colleges = sorted(cosine_sim_scores, key=lambda x: x[1], reverse=True)

    # Get the top n similar colleges (excluding the given college itself)
    top_n_colleges = [(college_data.iloc[i]['college'], sorted_colleges[i][1]) for i in range(1, n+1) if sorted_colleges[i][0] != college_index]
    seen_colleges = set()
    for i in range(1, n+1):
        college = college_data.iloc[i]['college']
        similarity_score = sorted_colleges[i][1]
        if sorted_colleges[i][0] != college_index and college not in seen_colleges:
            top_n_colleges.append((college, similarity_score))
            seen_colleges.add(college)

    return list(seen_colleges)

# Define a function to recommend colleges based on a given major
def recommend_colleges(major, n=10):
    # Filter the college data by the given major
    major_colleges = college_data[college_data['major'] == major]

    # Compute the TF-IDF feature matrix for the major college names
    feature_matrix = vectorizer.fit_transform(major_colleges['college'])

    # Compute the cosine similarity matrix for the feature matrix
    cosine_sim_matrix = cosine_similarity(feature_matrix)
    # print(cosine_sim_matrix)

    # Initialize an empty list to store the recommended colleges
    recommended_colleges = []

    # Loop over each major college and get the top n similar colleges
    for i, row in major_colleges.iterrows():
        college = row['college']
        similar_colleges = get_similar_colleges(college, n=n)
        recommended_colleges.append((college, similar_colleges))

    return recommended_colleges

# Test the recommendation function
cs_schools = sorted(recommend_colleges('Computer Science'))
engineering_schools = sorted(recommend_colleges('Engineering'))
b_schools = sorted(recommend_colleges('Business'))
# print(cs_schools)
# print("---CS SCHOOLS---")
# for col in cs_schools:
#     print(col[0])
# print("\n---ENGINEERING SCHOOLS---")
# for col in engineering_schools:
#     print(col[0])

# print("\n---BUSINESS SCHOOLS---")
# for col in b_schools:
#     print(col[0])
    
# print(engineering_schools)

# for recs in recommended_colleges:
#     for r in recs:
#         print(r)
# print(recommended_colleges)

# Test the similar colleges function
# college = 'Purdue University--West Lafayette'
# similar_colleges = get_similar_colleges(college)
# print("\nSimilar colleges to " + college + ":")
# for colleges in similar_colleges:
#     for col in colleges:
#         print(col)
# print(similar_colleges)
