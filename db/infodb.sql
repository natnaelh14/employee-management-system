INSERT INTO department (name)
VALUES
('Legal'),
('Marketing'),
('Human Resource'),
('Accounting and Finance'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('Lawyer', 90000, 1),
('Marketer', 70000, 2),
('Marketing Analyst', 70000, 2),
('Talent Management', 70000, 3),
('Recruiter', 60000, 3),
('Accountant', 80000, 4),
('Computer Engineer', 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('Alex', 'Briar', 1, NULL),
 ('Cindy', 'DePaul', 2, NULL),
 ('Elizabeth', 'LaFleur', 3, NULL),
 ('Giorno', 'Hyde', 4, NULL),
 ('Ibrahim', 'Jamac', 5, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('Killroy', 'Landers', 1, 1),
 ('Miles', 'Nancy', 2, 2),
 ('Oliviere', 'Prapor', 3, 3),
 ('Quincy', 'Rawls', 4, 4),
 ('Stephanie', 'Ula', 5, 5);