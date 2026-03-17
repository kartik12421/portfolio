require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PersonalInfo = require('./models/PersonalInfo');

const app = express();
const port = process.env.PORT || 3000;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 404 handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handler
app.use(async (err, req, res, next) => {
    const personalInfo = await PersonalInfo.findOne();
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        title: 'Error',
        personalInfo: personalInfo
    });
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected...');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => console.log(err));
