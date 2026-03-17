# Personal Portfolio Website

A beautiful and responsive personal portfolio website built with Node.js, Express, and MongoDB. Showcase your professional experience, skills, education, projects, and certifications all in one place.

## Features

- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Dynamic Content**: Content stored in MongoDB for easy updates
- **Multiple Sections**:
  - About Me
  - Experience
  - Education
  - Projects
  - Skills
  - Certifications
  - Contact
- **Contact Form**: Get in touch functionality with email integration
- **EJS Templating**: Dynamic page rendering with reusable components
- **Error Handling**: Comprehensive error pages and logging

## Tech Stack

- **Backend**: Node.js with Express.js
- **Templating Engine**: EJS
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer
- **Environment Management**: dotenv
- **Frontend**: CSS and JavaScript

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance running locally or a MongoDB Atlas account

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd Personal_Portfolio_Website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/portfolio
# Add any email configuration if using Nodemailer
```

4. Seed the database (optional):
```bash
npm run seed
```

## Running the Project

Start the development server:
```bash
npm start
```

The website will be available at `http://localhost:3000`

## Project Structure

```
├── app.js                 # Main Express application
├── package.json          # Project dependencies and scripts
├── seed.js              # Database seeding script
├── models/
│   └── PersonalInfo.js  # Mongoose schema for portfolio data
├── routes/
│   └── index.js         # Route definitions
├── views/               # EJS templates
│   ├── index.ejs        # Home page
│   ├── about.ejs        # About section
│   ├── experience.ejs   # Experience section
│   ├── education.ejs    # Education section
│   ├── projects.ejs     # Projects section
│   ├── skills.ejs       # Skills section
│   ├── certifications.ejs # Certifications section
│   ├── contact.ejs      # Contact page
│   ├── error.ejs        # Error page
│   └── partials/        # Reusable components
│       ├── header.ejs   # Header/navigation
│       └── footer.ejs   # Footer
├── public/              # Static assets
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   ├── js/
│   │   └── main.js      # Frontend JavaScript
│   ├── images/          # Portfolio images
│   └── downloads/       # Downloadable files (resume, etc.)
```

## Available Scripts

- `npm start` - Start the Express server
- `npm run seed` - Seed the database with initial data

## Environment Variables

Create a `.env` file with the following:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/portfolio` |

## Database Schema

The `PersonalInfo` model contains your portfolio information. Run `seed.js` to initialize it with sample data.

## Contact & Support

For issues or questions, please open an issue in the repository.

## License

ISC

---

Made with ❤️ by Kartik
