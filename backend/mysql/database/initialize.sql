CREATE DATABASE capstone;
USE capstone;
-- DROP TABLE IF EXISTS users,userContacts,userCar,userCredentials,userMileageResults,userRepairLog;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    create_time TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE userCredentials (
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	username VARCHAR(50),
    password VARCHAR(50),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
				ON DELETE CASCADE,
    UNIQUE KEY(user_id),
    UNIQUE KEY(username)
);


CREATE TABLE userContacts (
	id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	email VARCHAR(50),
    phone_num INT NOT NULL,
    address VARCHAR(50),
	PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES users(id)
		ON DELETE CASCADE,
    UNIQUE KEY (email,phone_num)
);



CREATE TABLE userCar(
	car_id INT NOT NULL,
    user_id INT NOT NULL,
	vin_num VARCHAR(50),
    mileage INT,
    car_year INT,
    car_make VARCHAR(50),
    car_model VARCHAR(50),
	PRIMARY KEY (car_id),
    FOREIGN KEY (user_id)
    REFERENCES users (id)
		ON DELETE CASCADE,
    UNIQUE KEY (vin_num)
);

CREATE TABLE userMileageResults (
	id INT NOT NULL AUTO_INCREMENT,
	car_id INT NOT NULL,
	prompt1 INT,
    prompt2 INT,
    prompt3 INT,
    prompt4 INT,
    prompt5 INT,
    prompt6 INT,
    PRIMARY KEY (id),
    FOREIGN KEY (car_id)
    REFERENCES userCar (car_id)
		ON DELETE CASCADE
);

CREATE TABLE userRepairLog (
	id INT NOT NULL AUTO_INCREMENT,
	car_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (car_id)
    REFERENCES userCar (car_id)
		ON DELETE CASCADE
);