// routes/honeypots.js
const express = require('express');
const router = express.Router();

// Honeypots route
router.get('/', (req, res) => {
    res.render('honeypots');
});

module.exports = router;
