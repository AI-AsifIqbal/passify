const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors')

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const url = process.env.MONGO_URI
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;

let collection;

async function startServer() {
    try {
        await client.connect();
        console.log('✅ MongoDB Connected');

        const db = client.db(dbName);
        collection = db.collection('passwords');

        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();

// Get all passwords
app.get('/', async (req, res) => {
    try {
        const data = await collection.find().toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save a password
app.post('/', async (req, res) => {
    try {
        const result = await collection.insertOne(req.body);
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit a password
app.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a password
app.delete('/:id', async (req, res) => {
    try {
        await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
