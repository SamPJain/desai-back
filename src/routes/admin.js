const express = require('express');
const router = express.Router();

// Fixed admin password
const ADMIN_PASSWORD = 'admin123';

// POST /api/admin/login
router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

module.exports = router;