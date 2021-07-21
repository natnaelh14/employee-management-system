require('dotenv').config(); 
const chalk = require('chalk');
const connection = require('./Database');
const optionList = require('./src/optionList');

async function app () {
    console.log("\n");
    console.log(chalk.black.bgBlue('Employee Manager'));
    console.log("\n");
    connection.connect(async(err) => {
        if (err) throw err;
        await optionList();
      });
};

app();