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