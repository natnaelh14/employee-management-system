const { viewEmployees, addEmployees, viewRoles, addRole, updateEmployeeRole, viewDept, addDept } = require('./questions');

const inquirer = require('inquirer');
const display = require('console.table');

    async function optionList () {

        const { mainMenu } = await inquirer
            .prompt(
                {
                    name: 'mainMenu',
                    type: 'list',
                    message: 'What would you like to do?',
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
                optionList();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
                optionList();
                break;
            case 'View all departments':
                await viewDept();
                optionList();
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