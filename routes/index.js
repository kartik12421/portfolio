const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const PersonalInfo = require('../models/PersonalInfo');

// GET home page
router.get('/', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.render('index', { title: 'Home', personalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET about page
router.get('/about', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.render('about', { title: 'About', personalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET projects page
router.get('/projects', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.render('projects', { title: 'Projects', personalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET contact page
router.get('/contact', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        const status = req.query.status;
        res.render('contact', { title: 'Contact', personalInfo, status });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET skills page
router.get('/skills', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.render('skills', { title: 'Skills', personalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET certifications page
router.get('/certifications', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.render('certifications', { title: 'Certifications', personalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET experience page
router.get('/experience', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.render('experience', { title: 'Experience', personalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET education page
router.get('/education', async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.findOne();
        res.render('education', { title: 'Education', personalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST contact form

// POST contact form
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.RECIPIENT_EMAIL,
            pass: process.env.GMAIL_APP_KEY
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/contact?status=error');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/contact?status=success');
        }
    });
});

module.exports = router;
