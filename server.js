const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());



// API Routes
app.get("/",(req,res)=>{
    res.send("welcome to app");
})
// Get all students
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM student', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/students', (req, res) => {
    const { name, class: studentClass, roll_number } = req.body;
  
    // Check if required fields are present
    if (!name || !studentClass || !roll_number) {
      return res.status(400).send({ message: 'All fields are required: name, class, roll_number.' });
    }
  
    // Database query to insert data
    db.query(
      'INSERT INTO student (name, `class`, roll_number) VALUES (?, ?, ?)',
      [name, studentClass, roll_number],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send({ message: 'Failed to add student to the database.', error: err.message });
        }
  
        // Success response
        res.status(201).send({
          message: 'Student added successfully.',
          student: {
            id: results.insertId,
            results
          },
        });
      }
    );
  });
  

// Update a student
app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, class: studentClass, roll_number } = req.body;
  
    // Validate input
    if (!name || !studentClass || !roll_number) {
      return res.status(400).json({ message: 'All fields are required: name, class, roll_number.' });
    }
  
    // Update query
    db.query(
      'UPDATE student SET name = ?, `class` = ?, roll_number = ? WHERE id = ?',
      [name, studentClass, roll_number, id],
      (err, results) => {
        if (err) {
          console.error('Error updating student:', err);
          return res.status(500).json({ message: 'Failed to update student.', error: err.message });
        }
  
        // Check if the student exists
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Student not found.' });
        }
  
        // Send a success message
        res.status(200).json({ message: 'Student details updated successfully.' });
      }
    );
  });
  

// Delete a student
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
  
    db.query('DELETE FROM student WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error deleting student:', err);
        return res.status(500).json({ message: 'Failed to delete student.', error: err.message });
      }
  
      // Check if the student exists
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found.' });
      }
  
      // Send success response
      res.status(200).json({ message: 'Student deleted successfully.' });
    });
  });
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

