DROP TABLE calendar;

CREATE TABLE calendar (
	Id serial primary key,
	Description varchar(50),
	Appointment date,
	Household int REFERENCES household(id)
);


INSERT INTO
	calendar
	(Description, Appointment, Household)
VALUES
	('Emmas Impfung', to_date('08/12/2020', 'mm/dd/yyyy'), 1),
	('Lucky kastrieren', to_date('07/04/2020', 'mm/dd/yyyy'), 2),
	('Mia bei Tasso anmelden', to_date('07/02/2020', 'mm/dd/yyyy'), 3);


SELECT * FROM calendar ORDER BY Appointment;
