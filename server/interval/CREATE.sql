DROP TABLE interval;
DROP TABLE interval_type;

CREATE TABLE interval_type (
	Id int primary key,
	Name varchar(20)
);

CREATE TABLE interval (
	Id serial primary key,
	Name varchar(20),
	Type int REFERENCES interval_type(id),
	Begintime time,
	Endtime time
);

INSERT INTO
	interval_type
	(Id, Name)
VALUES
	(1, 'Feeding'),
	(2, 'Outgoing');

INSERT INTO
	interval
	(Name, Type, Begintime, Endtime)
VALUES
	('Morgenfütterung', 1, '8:00', '9:00'),
	('Abendfütterung', 1, '17:00', '19:00'),
	('Morgenspaziergang', 2, '6:00', '8:00'),
	('Abendspaziergang', 2, '20:00', '21:00');


SELECT * FROM interval ORDER BY Name;

