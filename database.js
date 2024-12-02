const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com', // Replace with your hostname
  user: 'sql12749192',      // Replace with your username
  password: 'IVKVT57kDL',  // Replace with your password
  database: 'sql12749192',      // Replace with your database name
  port: 3306,                 // Replace with your port (if not 3306)
  connectTimeout: 10000,
  ssl: false// Add if SSL is required
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit the app if the database connection fails
  } else {
    console.log('Connected to MySQL database.');
  }
});

const createTableQuery = `
        CREATE TABLE IF NOT EXISTS student (
        id INT AUTO_INCREMENT PRIMARY KEY,    -- Auto-incrementing primary key
        name VARCHAR(100) NOT NULL,           -- Name of the student
        class VARCHAR(50) NOT NULL,           -- Class of the student
        roll_number INT NOT NULL,             -- Roll number of the student
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for record creation
        );
  `;
  

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully.');
    }

    // Close the connection
    // db.end();
  });
// Connect to MySQL

module.exports = db;
