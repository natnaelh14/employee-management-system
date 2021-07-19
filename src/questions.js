const inquirer = require("inquirer");

const checkString = (input) => {
  if (input !== undefined && typeof input === "string") {
    return true;
  } else {
    console.log(" Please enter a valid value.");
    return false;
  }
};

const viewEmployees = async (db) => {
  const results = await db.query(`
    SELECT employee.id AS ID,
    employee.first_name AS "First Name",
    employee.last_name AS "Last Name", 
    role.title AS "Job Title",
    department.name AS Department,
    role.salary AS Salary, 
    CONCAT(e.first_name, " ", e.last_name) AS Manager 
    FROM employee INNER JOIN role ON role.id = employee.role_id 
    INNER JOIN department ON department.id = role.department_id
    LEFT JOIN employee e ON employee.manager_id = e.id
    ORDER BY ID ASC`);
  console.table(results);
};

async function addEmployees(db) {
  let roleData = await db.query(`SELECT id, title FROM role`);
  let managerData = await db.query(
    `SELECT id, CONCAT(first_name, " ", last_name) AS Manager FROM employee`
  );
  managerData.push({ id: managerData.length + 1, Manager: "None" });
  await inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is employee's first name?",
        validate: (input) => {
          return checkString(input);
        },
      },
      {
        name: "lastName",
        type: "input",
        message: "What is employee's last name?",
        validate: (input) => {
          return checkString(input);
        },
      },
      {
        name: "role",
        type: "list",
        message: "What is employee's role?",
        choices: roleData.map((x) => x.title),
      },
      {
        name: "manager",
        type: "list",
        message: "What is employee's manager?(if applicable)",
        choices: managerData.map((x) => x.Manager),
      },
    ])
    .then(({ firstName, lastName, role, manager }) => {
      const roleId = roleData.find((x) => x.title === role);
      if (manager === "None") {
        db.query(
          `INSERT INTO employee (first-name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
          [firstName, lastName, roleId.id, null]
        );
      } else {
        const managerId = managerData.find((x) => x.Manager === manager);
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
          [firstName, lastName, roleId.id, managerId.id]
        );
      }
    });
}

async function viewRoles(db) {
  const results = await db.query(`SELECT role.id AS ID,
    role.title AS "Job Title", 
    department.name AS Department,
    role.salary AS Salary  
    FROM role RIGHT JOIN department ON role.department_id = department.id
    ORDER BY ID ASC`);
  console.table(results);
}

async function addRole(db) {
  let departmentData = await db.query(`SELECT id, name FROM department`);
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
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
        [role, salary, departmentId.id]
      );
    });
}

async function updateEmployeeRole(db) {
  let employeeData = await db.query(
    `SELECT id, CONCAT(first_name, " ", last_name) AS Employee FROM employee`
  );
  let roleData = await db.query(`SELECT id, title FROM role`);
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
      db.query(
        `UPDATE employee SET role_id = ${roleId.id} WHERE id = ${employeeId.id}`
      );
    });
}

async function viewDept (db) {
  const results = await db.query('SELECT department.id AS ID, name AS Department FROM department');
  console.table(results);
}

async function addDept (db) {
  await inquirer
      .prompt(
          {
              name: 'department',
              type: 'input',
              message: 'Please enter the name of the new DEPARTMENT:',
              validate: department => {
                  return checkString(department)
              }
          }
      )
      .then(({ department }) => {
          db.query(`INSERT INTO department (name) VALUES (?)`, [department])
      })
}

module.exports = { viewEmployees, addEmployees, viewRoles, addRole, updateEmployeeRole, viewDept, addDept };

