CREATE DATABASE capstone;
USE capstone;

CREATE TABLE IF NOT EXISTS users (
	id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE KEY
);

CREATE TABLE IF NOT EXISTS vehicles (
	v_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE KEY,
    v_ymm VARCHAR(100) NOT NULL,
    v_trim VARCHAR(50) NOT NULL,
    v_engine VARCHAR(50) NOT NULL,
    v_transmission VARCHAR(50) NOT NULL,
    vin VARCHAR(50) NOT NULL UNIQUE KEY,
    mileage INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS repairLog (
	repair_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE KEY,
    vehicle_id INT NOT NULL UNIQUE KEY,
    repair_mileage INT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    maintenance VARCHAR(200),
    performed_by VARCHAR(50),
    contact VARCHAR(50),
    material INT,
    labor INT,
    other INT,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(vehicle_id)
);