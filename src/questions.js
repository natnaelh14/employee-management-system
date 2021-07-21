const inquirer = require("inquirer");
const connection = require("../Database");
require("console.table");

const checkString = (input) => {
  if (input !== undefined && typeof input === "string") {
    return true;
  } else {
    console.log(" Please enter a valid value.");
    return false;
  }
};

const viewEmployees = async () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log("Here is a list of all the roles");
    console.log("\n");
    console.table(results);
  });
};

//Added Employee
async function addEmployees() {
  const selectRoleQuery = await connection.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id`);
  const selectEmployeeQuery = await connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`);
  const employee = await inquirer.prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]);

  const roleChoices = selectRoleQuery.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer.prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices,
  });

  employee.role_id = roleId;

  const managerChoices = selectEmployeeQuery.map(
    ({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    })
  );
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await inquirer.prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices,
  });
  employee.manager_id = managerId;
  await connection.query("INSERT INTO employee SET ?", employee);
  console.log(
    `Employee named ${employee.first_name} ${employee.last_name} has been added to the database`
  );
}

async function viewRoles() {
  const results = await connection.query(`SELECT role.id AS id,
    role.title AS "title", 
    department.name AS department,
    role.salary AS salary  
    FROM role RIGHT JOIN department ON role.department_id = department.id
    ORDER BY ID ASC`);
  console.log("Here is a list of all the roles");
  console.log("\n");
  console.table(results);
}

//Create a Role
async function addRole() {
  let departmentData = await connection.query(
    `SELECT id, name FROM department`
  );
  await inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "Please enter the role TITLE:",
        validate: (input) => {
          return checkString(input);
        },
      },
      {
        name: "salary",
        type: "number",
        message: "Please enter the role's SALARY:",
        validate: (salary) => {
          if (!isNaN(salary) && salary > 0) {
            return true;
          } else {
            console.log(" Please enter a valid integer.");
            return false;
          }
        },
      },
      {
        name: "department",
        type: "list",
        message: "Please select the role's DEPARTMENT",
        choices: departmentData.map((x) => x.name),
      },
    ])
    .then(({ role, salary, department }) => {
      const departmentId = departmentData.find((x) => x.name === department);
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
        [role, salary, departmentId.id]
      );
      console.log(`Added ${role} to the database`);
    });
}

//Update an employee's role
async function updateEmployeeRole() {
  let employeeData = await connection.query(
    `SELECT id, CONCAT(first_name, " ", last_name) AS Employee FROM employee`
  );
  let roleData = await connection.query(`SELECT id, title FROM role`);
  await inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message: "Select EMPLOYEE to update:",
        choices: employeeData.map((x) => x.Employee),
      },
      {
        name: "role",
        type: "list",
        message: "Select ROLE to update to:",
        choices: roleData.map((x) => x.title),
      },
    ])
    .then(({ employee, role }) => {
      const employeeId = employeeData.find((x) => x.Employee === employee);
      const roleId = roleData.find((x) => x.title === role);
      connection.query(
        `UPDATE employee SET role_id = ${roleId.id} WHERE id = ${employeeId.id}`
      );
      console.log(`updated ${employee}\'s role to ${role}`);
    });
}

//View all the Departments
async function viewDept() {
  const results = await connection.query(
    "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
  );
  console.log("Here is the list of all the departments.");
  console.log("\n");
  console.table(results);
}

//created a new department
async function addDept() {
  await inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the department",
      validate: (department) => {
        return checkString(department);
      }
    })
    console.log('department', department)
    .then(({ department }) => {
      connection.query("INSERT INTO department SET ?", department);
    });
    console.log(`Added ${department} department to the database`);
}

async function deleteDept() {
  const departmentQuery = await connection.query(
    "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name")

    const deptLists = departmentQuery.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await inquirer.prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department do you want to remove",
      choices: deptLists
    });
  
    connection.query("DELETE FROM department WHERE id = ?", departmentId);
  
    console.log(`Deleted selected department along with associated files from the database`);

  }

module.exports = {
  viewEmployees,
  addEmployees,
  viewRoles,
  addRole,
  updateEmployeeRole,
  viewDept,
  addDept,
  deleteDept
};
