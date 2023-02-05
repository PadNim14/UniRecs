const axios = require("axios");
const cheerio = require("cheerio");

async function scrape() {
  const response = await axios.get("https://www.usnews.com/best-colleges/rankings/national-universities?_mode=table");
  const $ = cheerio.load(response.data);
//   console.log(response.data);

  $("article").each((i, elem) => {
    console.log(i, $(elem).text());
  });
}

scrape();