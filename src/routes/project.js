const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();

const uri = 'mongodb+srv://gauravkumawat:special123@gharkins.56aoupk.mongodb.net';
const client = new MongoClient(uri);
const dbName = 'productsDB';
const collectionName = 'products';

// Middleware to ensure DB connection
async function getCollection() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db(dbName).collection(collectionName);
}

// Helper for timestamped logs
function logWithTimestamp(message, data) {
    const now = new Date().toISOString();
    if (data !== undefined) {
        console.log(`[${now}] ${message}`, data);
    } else {
        console.log(`[${now}] ${message}`);
    }
}

// CREATE
router.post('/', async (req, res) => {
    try {
        const collection = await getCollection();
        const result = await collection.insertOne(req.body);
        logWithTimestamp('Product created:', { _id: result.insertedId, ...req.body });
        res.status(201).json({ _id: result.insertedId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const collection = await getCollection();
        const products = await collection.find({}).toArray();
        logWithTimestamp('Fetched all products');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const product = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!product) {
            logWithTimestamp('Product not found:', req.params.id);
            return res.status(404).json({ error: 'Not found' });
        }
        logWithTimestamp('Fetched product:', req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const existing = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!existing) {
            logWithTimestamp('Product not found for update:', req.params.id);
            return res.status(404).json({ error: 'Not found' });
        }

        const updates = req.body;
        const unset = {};

        // Find keys in existing that are missing in updates
        Object.keys(existing).forEach(key => {
            if (!(key in updates) && key !== '_id') {
                unset[key] = "";
            }
        });

        const updateQuery = { $set: updates };
        if (Object.keys(unset).length) {
            updateQuery.$unset = unset;
        }

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            updateQuery,
            { returnDocument: 'after' }
        );

        logWithTimestamp('Updated product:', req.params.id);
        res.json(result.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            logWithTimestamp('Product not found for deletion:', req.params.id);
            return res.status(404).json({ error: 'Not found' });
        }
        logWithTimestamp('Deleted product:', req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;