DROP TABLE feed;

CREATE TABLE feed (
	Id serial primary key,
	Feedtimestamp timestamp,
	Comment TEXT
);


INSERT INTO
	feed
	(Feedtimestamp, Comment)
VALUES
	(current_timestamp,'Trockenfutter'),
	(current_timestamp,'Nassfutter'),
	(current_timestamp, 'Wasser');

SELECT * FROM feed ORDER BY Feedtimestamp DESC;

