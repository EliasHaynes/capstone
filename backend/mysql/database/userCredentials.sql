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