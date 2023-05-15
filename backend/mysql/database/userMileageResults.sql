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