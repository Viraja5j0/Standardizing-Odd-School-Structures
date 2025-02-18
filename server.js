// server.js
import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/schoolDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

// School Schema and Model
const schoolSchema = new mongoose.Schema({
    name: String,
    location: String,
    numberOfStudents: Number
});

const School = mongoose.model('School', schoolSchema);

// Routes for storing and fetching data

// Add a new school
app.post('/add-school', async (req, res) => {
    const { name, location, numberOfStudents } = req.body;
    const school = new School({ name, location, numberOfStudents });

    try {
        await school.save();
        res.status(201).send('School added successfully');
    } catch (err) {
        res.status(400).send('Error adding school: ' + err);
    }
});

// Fetch all schools
app.get('/schools', async (req, res) => {
    try {
        const schools = await School.find();
        res.status(200).json(schools);
    } catch (err) {
        res.status(400).send('Error fetching schools: ' + err);
    }
});

// Update a school
app.put('/update-school/:id', async (req, res) => {
    const { id } = req.params; // Extract school ID from the URL
    const { name, location, numberOfStudents } = req.body; // Extract data from the request body

    try {
        const updatedSchool = await School.findByIdAndUpdate(id, {
            name,
            location,
            numberOfStudents
        }, { new: true });

        if (!updatedSchool) {
            return res.status(404).send('School not found');
        }

        res.status(200).send('School updated successfully');
    } catch (err) {
        res.status(400).send('Error updating school: ' + err);
    }
});

// Delete a school
app.delete('/delete-school/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSchool = await School.findByIdAndDelete(id);

        if (!deletedSchool) {
            return res.status(404).send('School not found');
        }

        res.status(200).send('School deleted successfully');
    } catch (err) {
        res.status(400).send('Error deleting school: ' + err);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
