/*TODO: um Haushalts-Id erweitern, die wird der Fremdschlüssel*/
DROP TABLE pets;
DROP TABLE species;

CREATE TABLE species (
	Id int primary key,
	Name varchar(10)
);

CREATE TABLE pets (
	Id serial primary key,
	IdNumber varchar (20) UNIQUE,
	Species int REFERENCES species(Id),
	Race varchar(30),
	Name varchar (20),
	Birthday date,
	Gender varchar (15),
	Household int REFERENCES household(id)

);

INSERT INTO
	species
	(Id, Name)
VALUES
	(1, 'Dog'),
	(2, 'Cat');

INSERT INTO
	pets
	(IdNumber, Species, Race, Name, Birthday, Gender, Household)



VALUES
	('000000000', 1, 'Bulldog','Lucky', to_date('04/26/2012', 'mm/dd/yyyy'),  'male', 1),
	('000000001', 1, 'Dachshund', 'Mia', to_date('04/07/2018', 'mm/dd/yyyy'),  'female',2),
	('000000002', 2, 'Maine Coon','Herbert', to_date('12/23/2016', 'mm/dd/yyyy'),  'male',3),
	('000000003', 2, 'Bengal','Tom', to_date('4/26/2012', 'mm/dd/yyyy'),  'male',1),
	('000000004', 2, 'German Rex','Katja', to_date('8/02/2003', 'mm/dd/yyyy'), 'female',2);



SELECT * FROM pets a LEFT JOIN species b ON (a.Species = b.Id) LEFT JOIN household c ON (a.Household = c.Id) ORDER BY IdNumber;



