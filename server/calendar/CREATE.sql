CREATE TABLE calendar (
	Id serial primary key,
	Discription varchar(50),
	Appointment date
);


INSERT INTO
	calendar
	(Discription, Appointment)
VALUES
	('Emmas Impfung', to_date('08/12/2020', 'mm/dd/yyyy')),
	('Lucky kastrieren', to_date('07/04/2020', 'mm/dd/yyyy')),
	('Mia bei Tasso anmelden', to_date('07/02/2020', 'mm/dd/yyyy'));


SELECT * FROM calendar ORDER BY Appointment;
