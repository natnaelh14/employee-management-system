const Database = require('../libs/Database')
const { viewEmployees, addEmployees, viewRoles, addRole, updateEmployeeRole, viewDept, addDept } = require('./questions');

const inquirer = require('inquirer');
const display = require('console.table');

const main = async () => {
    const db = new Database({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    })

    for (; ;) {
        const { mainMenu } = await inquirer
            .prompt(
                {
                    name: 'mainMenu',
                    type: 'list',
                    message: 'MAIN MENU',
                    choices: ['View all employees', 'Add an employee', 'View all roles', 'Add a role', 'Update an employee role', 'View all departments', 'Add a department', 'Quit application']
                }
            );
        switch (mainMenu) {
            case 'View all employees':
                await viewEmployees(db);
                break;
            case 'Add an employee':
                await addEmployees(db);
                break;
            case 'View all roles':
                await viewRoles(db);
                break;
            case 'Add a role':
                await addRole(db);
                break;
            case 'Update an employee role':
                await updateEmployeeRole(db);
                break;
            case 'View all departments':
                await viewDept(db);
                break;
            case 'Add a department':
                await addDept(db);
                break;
            case 'Quit application':
                console.log('Bye');
                await db.close();
                return;
        }
    }
}

module.exports = main;