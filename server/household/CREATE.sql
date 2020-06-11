DROP TABLE household;

CREATE TABLE household (
	Id serial primary key,
	Name varchar(20)
);


INSERT INTO
	household
	(Name)
VALUES
	('Rein'),
	('Topolska'),
	('Peter');


SELECT * FROM household ORDER BY Name;
