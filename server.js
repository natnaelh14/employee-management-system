require('dotenv').config(); 
const connection = require('./Database');


const welcome = require('./src/welcome');
const optionList = require('./src/optionList');

async function app () {
    welcome();
    connection.connect(async(err) => {
        if (err) throw err;
        await optionList();
      });
    
};

app();