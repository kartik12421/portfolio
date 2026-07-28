require('dotenv').config();
const mongoose = require('mongoose');
const PersonalInfo = require('./models/PersonalInfo');

const db = process.env.MONGO_URI;

const seedData = {
    name: 'Kartik Joshi',
    github: 'https://github.com/kartik12421',
    linkedin: 'https://www.linkedin.com/in/kartik-joshi-31a509330',
    instagram: 'https://www.instagram.com/kj_is__here_/',
    email: 'kartikjoshi12421@gmail.com',
    skills: [
        { name: 'MongoDB', imageUrl: 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white', url: 'https://www.mongodb.com/' },
        { name: 'Express.js', imageUrl: 'https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white', url: 'https://expressjs.com/' },
        { name: 'React.js', imageUrl: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB', url: 'https://react.dev/' },
        { name: 'Node.js', imageUrl: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white', url: 'https://nodejs.org/' },
        { name: 'HTML5', imageUrl: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white', url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
        { name: 'CSS3', imageUrl: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        { name: 'JavaScript', imageUrl: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'Bootstrap', imageUrl: 'https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white', url: 'https://getbootstrap.com/' },
        { name: 'Material UI', imageUrl: 'https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white', url: 'https://mui.com/' },
        { name: 'Tailwind CSS', imageUrl: 'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white', url: 'https://tailwindcss.com/' },
        { name: 'Java', imageUrl: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white', url: 'https://www.java.com/' },
        { name: 'MySQL', imageUrl: 'https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white', url: 'https://www.mysql.com/' },
        { name: 'Docker', imageUrl: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white', url: 'https://www.docker.com/' },
        { name: 'Jira', imageUrl: 'https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white', url: 'https://www.atlassian.com/software/jira' },
        { name: 'TypeScript', imageUrl: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white', url: 'https://www.typescriptlang.org/' },
        { name: 'PHP', imageUrl: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white', url: 'https://www.php.net/' },
        { name: 'SQL', imageUrl: 'https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white', url: 'https://en.wikipedia.org/wiki/SQL' },
        { name: 'Redis', imageUrl: 'https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white', url: 'https://redis.io/' },
        { name: 'LangChain', imageUrl: 'https://img.shields.io/badge/LangChain-1C3C3A?style=for-the-badge&logo=chainlink&logoColor=white', url: 'https://www.langchain.com/' },
        { name: 'LangGraph', imageUrl: 'https://img.shields.io/badge/LangGraph-1C3C3A?style=for-the-badge&logo=graphviz&logoColor=white', url: 'https://www.langchain.com/langgraph' },
        { name: 'Nginx', imageUrl: 'https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white', url: 'https://nginx.org/' },
        { name: 'Render', imageUrl: 'https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black', url: 'https://render.com/' },
        { name: 'Git', imageUrl: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white', url: 'https://git-scm.com/' },
        { name: 'Postman', imageUrl: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white', url: 'https://www.postman.com/' }
    ],
    work: [
        {
            title: 'GenUI — Build React Components with AI',
            description: `<ul>
                <li>Developed an AI-powered SaaS platform and published the <code>genui-library</code> npm package for generating reusable React components using React.js, Node.js, Express.js, and MongoDB, reaching 100+ average weekly downloads and a peak of 2,799 weekly downloads.</li>
                <li>Created 20+ reusable React UI components.</li>
                <li>Improved MongoDB query performance through indexing.</li>
                <li>Implemented 3 MongoDB data models.</li>
                <li>Implemented authentication, a component explorer, and a reusable UI component library.</li>
            </ul>`,
            github: 'https://github.com/kartik12421/GenUI.git',
            npmUrl: 'https://www.npmjs.com/package/genui-library',
            liveUrl: 'https://genui-1-tkei.onrender.com/'
        },
        {
            title: 'TravelDen — Full-Stack Accommodation Platform',
            description: `<ul>
                <li>Developed a scalable full-stack accommodation platform using the MERN stack, implementing MVC architecture with 3 database models and 15+ RESTful API endpoints.</li>
                <li>Implemented user authentication via Passport.js with session handling and Joi-based validation.</li>
                <li>Integrated Cloudinary for image storage, supporting upload and deletion workflows.</li>
                <li>Built centralized error handling using middleware (wrapAsync, custom error classes).</li>
                <li>Optimized MongoDB query performance through indexing, improving database efficiency and reducing query execution time.</li>
            </ul>`,
            github: 'https://github.com/kartik12421/TravelDen.git',
            liveUrl: 'https://travelden.onrender.com/listings'
        },
        {
            title: 'WeatherVerse — Weather Web Application',
            description: `<ul>
                <li>Developed a React-based interface displaying real-time weather data for cities worldwide, integrated with the OpenWeather API.</li>
                <li>Implemented dynamic state management using React Hooks for real-time weather updates and seamless user interactions.</li>
                <li>Handled API failures gracefully by displaying structured error messages to users.</li>
                <li>Designed responsive layouts ensuring usability across multiple devices.</li>
            </ul>`,
            github: 'https://github.com/kartik12421/WeatherVerse.git',
            liveUrl: 'https://weatherverse-kartikjoshi.netlify.app/'
        },
        {
            title: 'Spotify clone (UI)',
            description: `<ul>
                <li>A pixel-perfect, highly responsive music streaming interface.</li>
                <li>Leverages a global Content Delivery Network (CDN) for instantaneous asset rendering and a smooth, cinematic user experience across all devices.</li>
            </ul>`,
            github: 'https://github.com/kartik12421/Spotify',
            liveUrl: 'https://dynamic-kitsune-e90d53.netlify.app/'
        }
    ],
    education: [
        {
            institution: 'COER University, Roorkee',
            degree: 'Bachelor of Computer Applications (BCA)',
            years: '2024 - 2027',
            details: 'CGPA: 9.02'
        },
        {
            institution: 'Divine Light School, Haridwar',
            degree: 'Class XII (Intermediate)',
            years: '2023 - 2024',
            details: 'Passed Class XII'
        },
        {
            institution: 'Divine Light School, Haridwar',
            degree: 'Class X (High School)',
            years: '2021 - 2022',
            details: 'Passed Class X'
        }
    ],
    certifications: [
        {
            name: 'Open Source Contributor — GirlScript Summer of Code (GSSoC) 2026',
            url: 'https://www.linkedin.com/posts/kartik-joshi-31a509330_gssoc2026-opensource-opensourcecontributor-activity-7456456007175626752-jjZj?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNeeoYBJaT8poyOMSvInxpg4HeBqO1h-fE'
        },
        {
            name: 'First Position — Web Development Quiz',
            url: 'https://www.linkedin.com/posts/udaan-the-endless-journey-a51a513aa_winnerannouncement-fullstackdevelopment-skilldevelopment-activity-7451266998388383745-Fmbf?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNeeoYBJaT8poyOMSvInxpg4HeBqO1h-fE'
        },
        {
            name: 'IIT Roorkee E-Summit Workshop — Certificate of Participation',
            url: 'https://www.linkedin.com/posts/kartik-joshi-31a509330_iitroorkee-esummit-professionalgrowth-activity-7433899234132705281-06dz?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNeeoYBJaT8poyOMSvInxpg4HeBqO1h-fE'
        },
        {
            name: 'National Hackathon Participation',
            url: 'https://www.linkedin.com/posts/kartik-joshi-31a509330_hackathon-innovation-coding-activity-7304066644685852672-R-IC?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNeeoYBJaT8poyOMSvInxpg4HeBqO1h-fE'
        },
        {
            name: 'Internal Hackathon Participation',
            url: 'https://www.linkedin.com/posts/kartik-joshi-31a509330_hackathon5-teamwork-innovation-activity-7324732283230273537-3Te0?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNeeoYBJaT8poyOMSvInxpg4HeBqO1h-fE'
        },
        {
            name: 'Digital Fabrication and Rapid Prototyping Workshop',
            path: '/images/prototyping.jpeg'
        },
        {
            name: 'Group Discussion Competition',
            path: '/images/gd.jpeg'
        },
        {
            name: 'Microsoft - Cloud Computing Workshop (IIT Roorkee)',
            path: '/images/microsoft.png'
        },
        {
            name: 'Azure - Cloud Computing Workshop (IIT Roorkee)',
            path: '/images/azur.png'
        },
        {
            name: 'National Hackathon - 2 Certificate',
            path: '/images/National-Hackathon-2.jpeg'
        },
        {
            name: 'National Hackathon - 1 Certificate',
            path: '/images/National-Hackathon-1.jpeg'
        },
        {
            name: 'Internal Hackathon - 5 Certificate',
            path: '/images/Internal-Hackathon-5.jpeg'
        },
        {
            name: 'Digital-Marketing-Workshop (IIT Roorkee) Certificate',
            path: '/images/Digital-Marketing-Workshop-(IIT Roorkee).jpeg'
        },
        {
            name: 'Content-Creation-Workshop (IIT Roorkee) Certificate',
            path: '/images/Content-Creation-Workshop-(IIT Roorkee).jpeg'
        },
        {
            name: 'IMS-workshop (IIT Roorkee) Certificate',
            path: '/images/IMS-workshop-(IIT Roorkee).jpeg'
        },
        {
            name: 'Paytm-workshop (IIT Roorkee) Certificate',
            path: '/images/Paytm-workshop-(IIT Roorkee).jpeg'
        },
        {
            name: 'Internal Hackathon - 3 Certificate',
            path: '/images/Internal-Hackathon-3.jpeg'
        },
        {
            name: 'Internal Hackathon - 1 Certificate',
            path: '/images/Internal-Hackathon-1.jpeg'
        },
        {
            name: 'HP - Effective Leadership',
            path: '/images/Effective-Leadership.jpeg'
        },
        {
            name: 'Udemy - Python Certificate',
            path: '/images/Python.jpeg'
        }
    ],
    experience: [
        {
            title: 'MERN Stack Developer Intern',
            company: 'SkillBuildEra (Remote)',
            years: 'Jan 2026 – Feb 2026',
            description: `<ul>
                <li>Developed and deployed full-stack MERN applications using React.js, Node.js, Express.js, and MongoDB following industry best practices.</li>
                <li>Designed and integrated RESTful APIs with CRUD operations, server-side validation, and structured error handling.</li>
                <li>Debugged backend and frontend issues using browser developer tools, Postman, and structured testing practices.</li>
                <li>Worked with MVC architecture, API integration, asynchronous programming, and JSON data handling.</li>
                <li>Used Git and GitHub for version control.</li>
            </ul>
            <div class="mt-3">
                <a href="https://www.linkedin.com/posts/kartik-joshi-31a509330_skillbuildera-skillbuildera-webdevelopment-activity-7430904073677258752-TDlf?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNeeoYBJaT8poyOMSvInxpg4HeBqO1h-fE" target="_blank" class="btn btn-outline-info btn-sm">Certificate</a>
                <a href="https://www.linkedin.com/posts/kartik-joshi-31a509330_skillbuildera-skillbuildera-webdevelopment-activity-7419277575421865984-2fKk?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFNeeoYBJaT8poyOMSvInxpg4HeBqO1h-fE" target="_blank" class="btn btn-outline-info btn-sm ms-2">Offer Letter</a>
            </div>`
        }
    ]
};

const seedDB = async () => {
    try {
        await mongoose.connect(db);
        await PersonalInfo.deleteMany({});
        console.log('Previous data cleared.');
        await PersonalInfo.create(seedData);
        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
