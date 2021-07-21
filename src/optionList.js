const { viewEmployees, addEmployees, viewRoles, addRole, updateEmployeeRole, viewDept, addDept, deleteDept, deleteEmployee, deleteRole } = require('./questions');

const inquirer = require('inquirer');
const display = require('console.table');

    async function optionList () {

        const { mainMenu } = await inquirer
            .prompt(
                {
                    name: 'mainMenu',
                    type: 'list',
                    message: 'What would you like to do?',
                    choices: ['View all employees', 'View all roles', 'View all departments', 'Add an employee', 'Add a role', 'Add a department', 'Update an employee role', 'Remove Employee', 'Remove Role', 'Remove Department', 'Quit application']
                }
            );
        switch (mainMenu) {
            case 'View all employees':
                await viewEmployees();
                optionList();
                break;
            case 'Add an employee':
                await addEmployees();
                optionList();
                break;
            case 'View all roles':
                await viewRoles();
                optionList();
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
                optionList();
                break;
            case 'Remove Department':
                await deleteDept();
                optionList();
                break;
            case 'Remove Employee':
                await deleteEmployee();
                optionList();
                break;
            case 'Remove Role':
                await deleteRole();
                optionList();
                break;
            case 'Quit application':
                console.log('exiting...')
                process.exit();
        }
    }

module.exports = optionList;