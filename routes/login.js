// routes/login.js
const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;
