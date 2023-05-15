CREATE TABLE userRepairLog (
	id INT NOT NULL AUTO_INCREMENT,
	car_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (car_id)
    REFERENCES userCar (car_id)
		ON DELETE CASCADE
);

-- This section of code is where the user creates columns in the table for each repair theyre documenting for their vehicle.
-- <!-- HTML button element -->
-- <button id="addColumnButton">Add Column</button>

-- <script>
-- const mysql = require('mysql2');

-- // create a connection to the MySQL database
-- const connection = mysql.createConnection({
--   host: 'localhost',
--   user: 'root',
--   password: 'password',
--   database: 'mydatabase'
-- });

-- // get a reference to the button element
-- const addColumnButton = document.getElementById('addColumnButton');

-- // attach a click event listener to the button element
-- addColumnButton.addEventListener('click', () => {
--   // prompt the user to enter the name of the new column
--   const columnName = prompt('Enter the name of the new column:');
  
--   // generate SQL query string to add the new column to the table
--   const query = `ALTER TABLE mytable ADD COLUMN ${columnName} VARCHAR(255) NOT NULL`;

--   // execute SQL query
--   connection.query(query, (err, results) => {
--     if (err) throw err;
--     console.log('Column added successfully');
--   });
-- });
-- </script>





