const mysql = require('mysql2');
require('dotenv').config();

db_host=process.env.HOST;
db_user=process.env.USER;
db_password=process.env.PASSWORD;
database_name=process.env.DATABASE;
db_port=process.env.DB_PORT;
// Create a MySQL connection
const db = mysql.createConnection({
  host: db_host, 
  user: db_user,      
  password: db_password,  
  database: database_name,     
  port: db_port,                 
  connectTimeout: 10000,
  ssl: false
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); 
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

    
  });
// Connect to MySQL

module.exports = db;
