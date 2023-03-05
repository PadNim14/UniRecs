const express = require('express')
const app = express()


function recommendColleges(questionnaireResponses) {
  // Define some criteria for matching colleges to the user's preferences
  const criteria = [
    {
      question: 'What is your intended major?',
      weight: 0.5,
      match: (response, college) => response === college.major
    },
    {
      question: 'What is your preferred location?',
      weight: 0.3,
      match: (response, college) => response === college.location
    },
    {
      question: 'What size school do you prefer?',
      weight: 0.2,
      match: (response, college) => response === college.size
    }
  ]

  // Create a score for each college based on how well it matches the user's preferences
  const collegeScores = colleges.map(college => {
    const score = criteria.reduce((totalScore, criterion) => {
      const response = questionnaireResponses[criterion.question]
      const matchScore = criterion.match(response, college) ? criterion.weight : 0
      return totalScore + matchScore
    }, 0)

    return { college, score }
  })

  // Sort the colleges by score and return the top 10
  const recommendedColleges = collegeScores
    .sort((a, b) => b.score - a.score)
    .map(({ college }) => college)
    .slice(0, 10)

  return recommendedColleges
}

// Define an endpoint for receiving questionnaire responses
app.post('/recommendations', (req, res) => {
  // Process the questionnaire data and run it through your recommendation system
  const recommendedColleges = recommendColleges(req.body);
  
  // Return the recommended colleges to the React app
  res.send(recommendedColleges)
})

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000')
})



