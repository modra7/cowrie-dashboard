// routes/users.js
const express = require('express');
const router = express.Router();

// Users route
router.get('/', (req, res) => {
    res.render('users');
});

module.exports = router;
