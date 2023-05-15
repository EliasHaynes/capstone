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