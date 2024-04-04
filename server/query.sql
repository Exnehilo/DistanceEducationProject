INSERT INTO user_roles VALUES (DEFAULT, 'admin'), (DEFAULT, 'teacher'), (DEFAULT, 'student'), (DEFAULT, 'parent');

SELECT * FROM user_roles;


INSERT INTO groups VALUES (DEFAULT, 'admin'), (DEFAULT, 'teachers'), (DEFAULT, 'parents'), (DEFAULT, '09.07.11'), (DEFAULT, '09.07.32');

SELECT * FROM groups;


INSERT INTO answer_types VALUES (DEFAULT, 'check'), (DEFAULT, 'string'), (DEFAULT, 'file'), (DEFAULT, 'test');

SELECT * FROM answer_types;