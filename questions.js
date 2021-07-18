const inquirer = require("inquirer");

const checkString = (input) => {
    if (input !== undefined && typeof(input) === 'string') {
        return true;
    } else {
        console.log(' Please enter a valid value.');
        return false;
    }
}

async function options() {
  await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is employee\'s first name?",
      validate: checkString(input)
      },
    {
      name: "lastName",
      type: "input",
      message: "What is employee\'s last name?",
      validate: checkString(input)
    },
    {
      name: "role",
      type: "list",
      message: "What is employee\'s role?",
      choices: roleData.map((x) => x.title),
    },
    {
      name: "manager",
      type: "list",
      message: "What is employee\'s manager?(if applicable)",
      choices: managerData.map((x) => x.Manager)
    },
  ])
  .then(({ firstName, lastName, role, manager }) => {
    const roleId = roleData.find(x => x.title === role);
    if (manager === 'None') {
        db.query(`INSERT INTO employee (first-name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [firstName, lastName, roleId.id, null]);
    } else {
        const managerId = managerData.find(x => x.Manager === manager);
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [firstName, lastName, roleId.id, managerId.id]);
    }
})
}
