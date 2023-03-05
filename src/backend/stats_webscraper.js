// const axios = require('axios');
// const cheerio = require('cheerio');

// async function scrapeCollegeData(colleges) {
//   for (let college of colleges) {
//     try {
//       const url = `https://nces.ed.gov/ipeds/datacenter/institutionprofile.aspx?unitId=${college.ipeds_id}`;
//       const response = await axios.get(url);
//       const $ = cheerio.load(response.data);

//       // Scrape acceptance rate
//       const acceptanceRateText = $('table[id=""] td:contains("Percent admitted - total:")')
//         .next()
//         .text()
//         .trim();
//       const acceptanceRate = parseFloat(acceptanceRateText) / 100;
//       college.acceptance_rate = acceptanceRate;

//       // Scrape average test scores and GPA
//       const testScoreGpaTable = $('table[id="ctl00_ContentPlaceHolder1_tblProfile"] td:contains("Admission testing ranges (25th and 75th percentiles):")').parent().parent();
//       const testScoreRows = testScoreGpaTable.find('tr');
//       const averageSATRow = testScoreRows.eq(2);
//       const averageACTRow = testScoreRows.eq(3);
//       const averageGPARow = testScoreRows.eq(4);

//       const averageSATScore = parseInt(averageSATRow.find('td').eq(1).text());
//       const averageACTScore = parseInt(averageACTRow.find('td').eq(1).text());
//       const averageGPA = parseFloat(averageGPARow.find('td').eq(1).text());

//       college.average_senior_high_SAT_score = averageSATScore;
//       college.average_senior_high_ACT_score = averageACTScore;
//       college.average_freshman_GPA = averageGPA;

//     } catch (error) {
//       console.log(`Error scraping data for ${college.university_name}: ${error.message}`);
//     }
//   }

//   return colleges;
// }

// // Example usage
// const collegeData = [
//   {
//     "university_name": "Princeton University",
//     "ipeds_id": 186131,
//     "state_ab": "NJ",
//     "2023_ranking": 1
//   },
//   {
//     "university_name": "Massachusetts Institute of Technology",
//     "ipeds_id": 166683,
//     "state_ab": "MA",
//     "2023_ranking": 2
//   },
//   // Add more colleges here...
//   {
//     "university_name": "Emory University",
//     "ipeds_id": 139658,
//     "state_ab": "GA",
//     "2023_ranking": 22
//   }
// ];

// scrapeCollegeData(collegeData).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });

// style="padding-top:7px; padding-bottom:7px;

const cheerio = require('cheerio');
const axios = require('axios');

async function scrapeCollegeData(colleges) {
    for (let college of colleges) {
        try {
            const url = `https://nces.ed.gov/ipeds/datacenter/institutionprofile.aspx?unitId=${college.ipeds_id}`;
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            // console.log($);
            // process.exit();

            // Scrape data from the <div class="ncess"> tag
            // const ncessDiv = $('div.ncess');
            // const $ = cheerio.load(html);
            const targetDiv = $('div[style="padding-top:7px; padding-bottom:7px"]');
            const contents = targetDiv.html();
            console.log(contents);
            process.exit();
            // Access tables
            const tables = ncessDiv.find('table');
            // console.log(tables);

            // Access specific rows and columns
            const locationRow = tables.eq(1).find('tr').eq(1);
            const location = locationRow.find('td').eq(1).text().trim();
            college.location = location;

            const enrollmentRow = tables.eq(2).find('tr').eq(1);
            const totalEnrollment = parseInt(enrollmentRow.find('td').eq(1).text().replace(/,/g, '').trim());
            college.total_enrollment = totalEnrollment;

            // Add more table rows/columns to scrape as needed

        } catch (error) {
            console.log(`Error scraping data for ${college.university_name}: ${error.message}`);
        }
    }

    return colleges;
}

// Example usage
const collegeData = [
    {
        "university_name": "Princeton University",
        "ipeds_id": 186131,
        "state_ab": "NJ",
        "2023_ranking": 1
    },
    {
        "university_name": "Massachusetts Institute of Technology",
        "ipeds_id": 166683,
        "state_ab": "MA",
        "2023_ranking": 2
    },
    // Add more colleges here...
    {
        "university_name": "Emory University",
        "ipeds_id": 139658,
        "state_ab": "GA",
        "2023_ranking": 22
    }
];

scrapeCollegeData(collegeData).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

