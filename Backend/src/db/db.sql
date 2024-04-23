CREATE database PlanPal

-- create personnel table
CREATE TABLE personnel (
    personnel_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
	last_name VARCHAR(50),
    email VARCHAR(50),
    contact VARCHAR(8),
    diet VARCHAR(20)
);

-- create constraint table for diet restrictions
ALTER TABLE personnel ADD CONSTRAINT diet_constraint CHECK (diet = 'VEGETARIAN' or diet = 'LACTOSE-INTOLERANT' or diet = 'HALAL' or diet ='NONE');

