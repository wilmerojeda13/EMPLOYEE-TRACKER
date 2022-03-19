INSERT INTO departments (name)
VALUES
('Marketing'),
('Accounting'),
('Cyber Security'),
('Software Developer');

INSERT INTO role (title, salary, department_id)
VALUES
('Marketing Manager', 100000, 1),
('Marketing Salesperson',90000,1),
('Accounting Manager', 80000, 2),
('Accounting Assistant',60000,2),
('Cyber Security Engineer', 150000,3),
('Security Analyst',100000,3),
('Full Stack Developer',110000,4);
('Junior Developer',65000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jason', 'Smith', 1,NULL),
('Alex', 'Rodriguez',2,1),
('Philips','Cooper',3,NULL ),
('Michael','Taylor',4,3),
('Wilson', 'Jordan',5,NULL),
('Jones', 'Antonio',6,5),
('Harris', 'Thompson',7,NULL),
('Camila', 'Sanchez',8,7);
