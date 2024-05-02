-- create personnel table
CREATE TABLE personnel (
    personnel_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL,
    contact VARCHAR(8) NOT NULL,
    diet VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
	FOREIGN KEY (diet) REFERENCES diets(diet)
);

-- seed two users into personnel table
INSERT INTO personnel (first_name, last_name, password, email, contact, diet) VALUES ('Kim', 'Lee', '$2b$12$/EXwTNh77KPqUlV59oksJe5yf9wiIrX28RrPnlcJ1s7vcjxtxtVaO', 'kim@abc.com', '87654321', 'LACTOSE-INTOLERANT');
INSERT INTO personnel (first_name, last_name, password, email, contact, diet) VALUES ('Kris', 'Teo', '$2b$12$/EXwTNh77KPqUlV59oksJe5yf9wiIrX28RrPnlcJ1s7vcjxtxtVaO', 'kris@abc.com', '98765432', 'VEGETARIAN');
INSERT INTO personnel (first_name, last_name, password, email, contact, diet) VALUES ('Sam', 'Tan', '$2b$12$/EXwTNh77KPqUlV59oksJe5yf9wiIrX28RrPnlcJ1s7vcjxtxtVaO', 'sam@abc.com', '91119111', 'NONE');


-- create diets table
CREATE TABLE diets (
	diet VARCHAR(50) PRIMARY KEY
);

-- seed dietary options into diets table
INSERT INTO diets (diet) VALUES ('VEGETARIAN');
INSERT INTO diets (diet) VALUES ('LACTOSE-INTOLERANT');
INSERT INTO diets (diet) VALUES ('HALAL');
INSERT INTO diets (diet) VALUES ('NONE');


SELECT * FROM diets;
SELECT * FROM personnel;



-- create events 
CREATE TABLE events (
	event_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	title VARCHAR(100),
	date DATE,
	time TIME,
	address VARCHAR(100),
	response_deadline DATE,
	is_active BOOLEAN DEFAULT TRUE NOT NULL,
	host_id INT,
	FOREIGN KEY (host_id) REFERENCES personnel(personnel_id)
);

SELECT * FROM events;


-- create event_guests table
CREATE TABLE event_guests (
	event_id uuid,
	guest_id int,
	diet VARCHAR(50) NOT NULL,
	is_attending BOOLEAN,
	PRIMARY KEY (event_id, guest_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id),
	FOREIGN KEY (guest_id) REFERENCES personnel(personnel_id),
	FOREIGN KEY (diet) REFERENCES diets(diet)
);

SELECT * FROM event_guests;



-- join events <> event_guests <> personnel table to get event name and associate guestlist
SELECT e.event_id, e.title, e.date, e.time, e.address, e.host_id, eg.guest_id, eg.is_attending, eg.diet, p.first_name, p.last_name, p.email, p.contact
FROM events e
INNER JOIN event_guests eg
ON e.event_id = eg.event_id
INNER JOIN personnel p
ON p.personnel_id = eg.guest_id
WHERE e.host_id = 1 AND e.event_id = '826cd06c-f862-4b59-844e-bd16ec6f4492'
ORDER BY eg.is_attending DESC;

-- sample update guest attendance via event_guests table
UPDATE event_guests
	SET is_attending = TRUE
	WHERE event_id = 'aaec1771-4da6-4d3e-968d-6429dceb1459' AND guest_id = 3;

-- sample update guest information via personnel table
UPDATE personnel
	SET email = 'kim.lee@abc.com', diet = 'NONE'
	WHERE personnel_id = 1;

-- sample delete guest from guestlist
DELETE FROM event_guests
	WHERE event_id = 'aaec1771-4da6-4d3e-968d-6429dceb1459' AND guest_id = 3;


-- get all events that the user has rsvp for
SELECT e.event_id, e.title, e.date, e.time, e.address, e.host_id, eg.is_attending, eg.diet
FROM events e
INNER JOIN event_guests eg
ON e.event_id = eg.event_id
INNER JOIN personnel p
ON p.personnel_id = eg.guest_id
WHERE eg.guest_id = 1 AND e.is_active = true;

