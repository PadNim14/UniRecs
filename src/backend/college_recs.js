
function college_recs() {

    const mind = require('node-mind');
    const collegeData = [
        { collegeId: 1, name: "Harvard University", city: "Cambridge", state: "Massachusetts", region: "Northeast" },
        { collegeId: 2, name: "Stanford University", city: "Stanford", state: "California", region: "West" },
        { collegeId: 3, name: "Massachusetts Institute of Technology", city: "Cambridge", state: "Massachusetts", region: "Northeast" },
        { collegeId: 4, name: "California Institute of Technology", city: "Pasadena", state: "California", region: "West" },
        { collegeId: 5, name: "University of Texas at Austin", city: "Austin", state: "Texas", region: "South" },
    ];

    const userData = [
        { userId: 1, gender: "Male", age: 20, state: "New York", major: "Computer Science" },
        { userId: 2, gender: "Female", age: 21, state: "California", major: "Business" },
        { userId: 3, gender: "Male", age: 19, state: "Texas", major: "Engineering" },
        { userId: 4, gender: "Female", age: 22, state: "Florida", major: "Psychology" },
        { userId: 5, gender: "Non-binary", age: 20, state: "Massachusetts", major: "Political Science" },
    ];

    const ratings = [
        { userId: 1, collegeId: 1, rating: 5 },
        { userId: 1, collegeId: 2, rating: 4 },
        { userId: 1, collegeId: 3, rating: 2 },
        { userId: 1, collegeId: 4, rating: 3 },
        { userId: 1, collegeId: 5, rating: 1 },
        { userId: 2, collegeId: 1, rating: 4 },
        { userId: 2, collegeId: 2, rating: 5 },
        { userId: 2, collegeId: 3, rating: 2 },
        { userId: 2, collegeId: 4, rating: 3 },
        { userId: 3, collegeId: 1, rating: 3 },
        { userId: 3, collegeId: 2, rating: 2 },
        { userId: 3, collegeId: 3, rating: 5 },
        { userId: 3, collegeId: 4, rating: 4 },
        { userId: 3, collegeId: 5, rating: 1 },
        { userId: 4, collegeId: 1, rating: 2 },
        { userId: 4, collegeId: 2, rating: 3 },
        { userId: 4, collegeId: 3, rating: 1 },
        { userId: 4, collegeId: 4, rating: 4 },
        { userId: 4, collegeId: 5, rating: 5 },
        { userId: 5, collegeId: 1, rating: 1 },
        { userId: 5, collegeId: 2, rating: 2 },
    ]

    // Sample user preferences
    const userPrefs = [
        { major: "Computer Science", region: "West" },
        { major: "Business", region: "Northeast" },
        { major: "Engineering", region: "South" },
        { major: "Psychology", region: "Midwest" },
        { major: "Political Science", region: "West" },
    ];

    // Create a matrix factorization model
    // Create a user-item rating matrix
    const userItemMatrix = new(userData.length, collegeData.length);
    userItemMatrix.set(0, 0, 5);
    // Perform matrix factorization
    const [P, Q] = model.fit(userItemMatrix, {
        learningRate: 0.01,
        epochs: 100,
        batchSize: 32,
        verbose: true,
    });

    // Generate predictions for all users and items
    const predictions = P.dot(Q.transpose());

    // Make recommendations for a user
    const userId = 1;
    const userRatings = userItemMatrix.getRow(userId);
    const userPredictions = predictions.getRow(userId);
    const recommendations = [];
    for (let i = 0; i < userPredictions.length; i++) {
        if (userRatings[i] === 0) {
            recommendations.push({ college: collegeData[i], rating: userPredictions[i] });
        }
    }
    recommendations.sort((a, b) => b.rating - a.rating);
    console.log(recommendations);


}
college_recs();