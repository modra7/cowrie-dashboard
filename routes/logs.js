// routes/logs.js
const express = require('express');
const router = express.Router();

// Logs route
router.get('/', (req, res) => {
    res.render('logs');
});

module.exports = router;
