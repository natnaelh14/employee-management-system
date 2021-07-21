INSERT INTO department (name)
VALUES
('Provider'),
('Nursing'),
('Respiratory'),
('Pharmacy'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('Internist', 200000, 1),
('Cardiologies', 300000, 1),
('Registered Nurse', 70000, 2),
('Nurse Practitioner', 100000, 2),
('Respiratory Therapist', 70000, 3),
('Pharmacist', 120000, 4),
('IT Specialist', 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('John', 'Tyler', 1, 1),
 ('James', 'Polk', 2, 2),
 ('Zachary', 'Taylor', 3, 3),
 ('Millard', 'Fillmore', 4, 4),
 ('Franklin', 'Pierce', 5, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
 ('Andrew', 'Johnson', 1, 1),
 ('Ulysses', 'Grant', 2, 2),
 ('James', 'Garfield', 3, 3),
 ('Chester', 'Arthur', 4, 4),
 ('Grover', 'Clevaland', 5, 5);