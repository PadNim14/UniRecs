import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

# Load the data
data = pd.read_csv('collegedata.csv')

# Define the features to use in the recommendation system
features = ['location', 'size', 'programs_offered', 'cost']

# Preprocess the data
data = data.drop_duplicates()
data = data.dropna(subset=features)
data = data.reset_index(drop=True)

# Extract features
vectorizer = CountVectorizer()
feature_matrix = vectorizer.fit_transform(data[features].apply(lambda x: ' '.join(str(i) for i in x), axis=1))

# Calculate similarity
similarity_matrix = cosine_similarity(feature_matrix)

# Generate recommendations
def get_recommendations(college_name):
    college_index = data[data['college_name']==college_name].index[0]
    similarity_scores = list(enumerate(similarity_matrix[college_index]))
    similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    top_colleges = [data.iloc[i[0]]['college_name'] for i in similarity_scores[1:6]]
    return top_colleges


if __name__ == "__main__":
    recs = get_recommendations("Columbia University")
    print(recs)
