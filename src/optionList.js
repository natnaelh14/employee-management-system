const { viewEmployees, addEmployees, viewRoles, addRole, updateEmployeeRole, viewDept, addDept } = require('./questions');

const inquirer = require('inquirer');
const display = require('console.table');

    async function optionList () {

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
                await viewEmployees();
                break;
            case 'Add an employee':
                await addEmployees();
                break;
            case 'View all roles':
                await viewRoles();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
                break;
            case 'View all departments':
                await viewDept();
                break;
            case 'Add a department':
                await addDept();
                break;
            case 'Quit application':
                await db.close();
                return;
        }
    }

module.exports = optionList;