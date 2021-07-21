require('dotenv').config(); 
const chalk = require('chalk');
const connection = require('./Database');
const optionList = require('./src/optionList');

async function app () {
    //employee manager banner
    console.log("\n");
    console.log(chalk.black.bgBlue('Employee Manager'));
    console.log("\n");
    connection.connect(async(err) => {
        if (err) throw err;
        //run the optionList function after the connection is made to prompt the user.
        await optionList();
      });
};

app();