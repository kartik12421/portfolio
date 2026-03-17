const mongoose = require('mongoose');

const PersonalInfoSchema = new mongoose.Schema({
    name: String,
    github: String,
    linkedin: String,
    instagram: String,
    email: String,
    skills: [
        {
            name: String,
            imageUrl: String,
            url: String
        }
    ],
    work: [
        {
            title: String,
            description: String,
            github: String,
            liveUrl: String
        }
    ],
    education: [
        {
            institution: String,
            degree: String,
            years: String
        }
    ],
    certifications: [
        {
            name: String,
            path: String
        }
    ],
    experience: [
        {
            title: String,
            company: String,
            years: String,
            description: String
        }
    ]
});

module.exports = mongoose.model('PersonalInfo', PersonalInfoSchema);
