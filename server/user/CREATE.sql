
DROP TABLE users;

CREATE TABLE users (
	Id serial primary key,
	Username varchar(10) UNIQUE,
	Password varchar(64),
	Prename varchar (15),
	Lastname varchar (20),
	Household int REFERENCES household(id)
);


INSERT INTO
	users
	(Username, Password, Prename, Lastname, Household)
VALUES
	('rrein', encode(sha256('Passwort'), 'hex'), 'Rebecca', 'Rein', 1),
	('atopolska', encode(sha256('Passwort'), 'hex'), 'Anna', 'Topolska', 2),
	('tpeter', encode(sha256('Passwort'), 'hex'), 'Tamara', 'Peter', 3),
	('epeter', encode(sha256('Passwort'), 'hex'), 'Elli', 'Peter', 3);



SELECT * FROM users /*a LEFT JOIN household b ON (a.household = b.Id)*/ ORDER BY Username;
