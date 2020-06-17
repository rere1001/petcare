DROP TABLE feed;

CREATE TABLE feed (
	Id serial primary key,
	Feedtimestamp timestamp,
	Comment TEXT,
	Pet int REFERENCES pets(id)
);


INSERT INTO
	feed
	(Feedtimestamp, Comment,Pet)
VALUES
	(current_timestamp,'Trockenfutter', 1),
	(current_timestamp,'Nassfutter',2),
	(current_timestamp, 'Wasser', 3);

SELECT * FROM feed a LEFT JOIN pets c ON (a.Pet = c.Id) ORDER BY Feedtimestamp DESC;



