
DROP TABLE users;

CREATE TABLE users (
	Id serial primary key,
	Username varchar(10) UNIQUE,
	Password varchar(64),
	Prename varchar (15),
	Lastname varchar (20)
);

/*TODO: household in extra tabel*/

INSERT INTO
	users
	(Username, Password, Prename, Lastname)
VALUES
	('rrein', encode(sha256('Passwort'), 'hex'), 'Rebecca', 'Rein'),
	('atopolska', encode(sha256('Passwort'), 'hex'), 'Anna', 'Topolska'),
	('tpeter', encode(sha256('Passwort'), 'hex'), 'Tamara', 'Peter'),
	('epeter', encode(sha256('Passwort'), 'hex'), 'Elli', 'Peter');



SELECT * FROM users /*a LEFT JOIN household b ON (a.household = b.Id)*/ ORDER BY Username;
