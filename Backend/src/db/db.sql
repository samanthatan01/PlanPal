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
	event_id SERIAL PRIMARY KEY,
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


-- seed two events into events table
INSERT INTO events (title, date, time, address, response_deadline, host_id) VALUES ('Wedding', '2024-11-11', '13:00:00.00', 'ABC Ave, Level 2', '2024-10-05', 1);
INSERT INTO events (title, date, time, address, response_deadline, host_id) VALUES ('Baby Shower for Noel', '2024-12-24', '17:00:00.00', '30 ABC Ave, Level 1', '2024-12-10', 2);


-- create event_guests table
CREATE TABLE event_guests (
	event_id int,
	guest_id int,
	diet VARCHAR(50) NOT NULL,
	is_attending BOOLEAN,
	PRIMARY KEY (event_id, guest_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id),
	FOREIGN KEY (guest_id) REFERENCES personnel(personnel_id),
	FOREIGN KEY (diet) REFERENCES diets(diet)
);

SELECT * FROM event_guests;

-- seed one RSVP into event_guests table
INSERT INTO event_guests (event_id, guest_id, diet, is_attending) VALUES (1, 3, 'NONE', TRUE);

drop table diets;
drop table personnel;
drop table events;
drop table event_guests;
