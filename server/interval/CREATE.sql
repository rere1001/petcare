DROP TABLE interval_pets;
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
	Endtime time,
	Household int REFERENCES household(id)
);

CREATE TABLE interval_pets (
	IntervalId int REFERENCES interval(id),
	PetId int REFERENCES pets(id)
);

INSERT INTO
	interval_type
	(Id, Name)
VALUES
	(1, 'Feeding'),
	(2, 'Outgoing');

INSERT INTO
	interval
	(Name, Type, Begintime, Endtime, Household)
VALUES
	('Morgenfütterung', 1, '8:00', '9:00', 1),
	('Abendfütterung', 1, '17:00', '19:00',2),
	('Morgenspaziergang', 2, '6:00', '8:00',3),
	('Abendspaziergang', 2, '20:00', '21:00',3);

INSERT INTO
	interval_pets
	(IntervalId, PetId)
VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 3);

SELECT * FROM interval a LEFT JOIN household b ON (a.Household = b.Id) ORDER BY Begintime;

