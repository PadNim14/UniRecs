const axios = require('axios');

async function getForum() {
    try {
        const response = await axios.get(
            'https://www.reddit.com/r/purdue.json'
        );
        console.log(response);
    } catch(error) {
        console.error(error);
    }
}

getForum();