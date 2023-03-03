// Read the file using pathname
const xlsx = require('xlsx');
var fs = require('fs');
const file = xlsx.readFile('us-liberalarts.xlsx');

// Grab the sheet info from the file
const sheetNames = file.SheetNames;
const totalSheets = sheetNames.length;

// Variable to store our data
let parsedData2 = [];

// Loop through sheets
for (let i = 0; i < totalSheets; i++) {

    // Convert to json using xlsx
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[0]]);

    // Skip header row which is the colum names
    tempData.shift();
    // Add the sheet's json to our data array
    // Rename keys
    const renamedData = tempData.map(obj => {
        const newObj = {};
        // console.log(key)
        // process.exit()
        for (const key in obj) {
            // console.log(key, obj[key]);
            // process.exit()
            switch (key) {
                case '__EMPTY':
                    // console.log(obj[key]);
                    newObj['college_name'] = obj[key];
                    break;
                case '__EMPTY_1':
                    newObj['state_ab'] = obj[key];
                    break;
                case '__EMPTY_2':
                    newObj['ipeds_id'] = obj[key];
                    break;
                case '__EMPTY_3':
                    newObj['2023_ranking'] = obj[key];
                    break;
                // Add more cases for each key you want to rename
                default:
                    break;
            }
        }

        return newObj;
    });
    parsedData2.push(...renamedData);
}
//   console.log(parsedData)
//   process.exit()
// for (var i = 0; i < 201; i++) {
//     console.log(parsedData[i]['university_name'] + ": " + parsedData[i]['ipeds_id'])

// }
// console.log(liberal_arts_colleges.length)
fs.writeFileSync('liberal_arts.json', JSON.stringify(parsedData2));
module.exports = parsedData2;
 // call a function to save the data in a json file

