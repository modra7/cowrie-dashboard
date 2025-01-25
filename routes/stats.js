// routes/stats.js
const express = require('express');
const router = express.Router();

// Stats route
router.get('/', (req, res) => {
    res.render('stats');
});

module.exports = router;
