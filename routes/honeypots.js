const express = require('express');
const router = express.Router();
const { Honeypot } = require('../models'); // Import the Honeypot model

router.get('/', async (req, res) => {
    try {
        const honeypots = await Honeypot.findAll();
        const plainHoneypots = honeypots.map(honeypot => honeypot.get({ plain: true }));
        console.log('Plain Honeypots data:', plainHoneypots); // Log the data for debugging
        res.render('honeypots', { honeypots: plainHoneypots });
    } catch (err) {
        console.error('Error fetching honeypots:', err);
        res.status(500).render('error', { error: 'Database error' });
    }
});




router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const honeypot = await Honeypot.findByPk(id);
        if (honeypot) {
            res.render('honeypotDetail', { honeypot });
        } else {
            res.status(404).render('error', { error: 'Honeypot not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Database error' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { ip, hostname, ssh_port, ssh_username, ssh_password } = req.body;
    try {
        const [updated] = await Honeypot.update(
            { ip, hostname, ssh_port, ssh_username, ssh_password },
            { where: { id } }
        );
        if (updated) {
            const updatedHoneypot = await Honeypot.findByPk(id);
            res.render('honeypotDetail', { honeypot: updatedHoneypot });
        } else {
            res.status(404).render('error', { error: 'Honeypot not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Database error' });
    }
});

// Delete a honeypot
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Honeypot.destroy({ where: { id } });
        if (deleted) {
            res.redirect('/honeypots');
        } else {
            res.status(404).render('error', { error: 'Honeypot not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'Database error' });
    }
});

module.exports = router;
