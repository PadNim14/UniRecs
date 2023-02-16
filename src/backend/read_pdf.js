const fs = require('fs')
const pdfParse = require('pdf-parse')
const getPDF = async (file) => {
    let readFileSync = fs.readFileSync(file)
    //   let writeFile = fs.writeFileSync("test.txt")
    try {
        let pdfExtract = await pdfParse(readFileSync)
        console.log('File content: ', pdfExtract.text)
        fs.writeFile("test.txt", pdfExtract.text, function (err) {
            if (err) {
                return console.log(err)
            }
            console.log("File written successfully!")
        }
        )
        // console.log('\n')
        // console.log('Total pages: ', pdfExtract.numpages)
        // console.log('\n')
        // console.log('All content: ', pdfExtract.info)
        // console.log('\n')
    } catch (error) {
        throw new Error(error)
    }
}
const pdfRead = './purdue_cds.pdf'
getPDF(pdfRead)