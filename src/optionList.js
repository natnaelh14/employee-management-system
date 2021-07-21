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
                    choices: ['View all employees', 'Add an employee', 'View all roles', 'Add a role', 'Update an employee role', 'View all departments', 'Add a department', 'Remove Department', 'Remove Employee', 'Remove Role', 'Quit application']
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
                await db.close();
                return;
        }
    }

module.exports = optionList;