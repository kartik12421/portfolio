# Kartik Joshi — Personal Portfolio Website

A dark, high-performance developer portfolio built with **React (Vite)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a live **MongoDB Atlas** Guestbook community feed and production-ready **Email Contact Service** on Netlify.

---

## 🚀 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend / Serverless:** Netlify Functions (`netlify/functions/comments.js`, `netlify/functions/contact.js`) & Express Dev Server (`server.js`)
- **Database:** MongoDB Atlas (M0 / Production Cluster)
- **Email Service:** Dual-pipeline support (Web3Forms / Resend API) delivering to `kartikjoshi842@gmail.com`
- **Build Tool:** Vite 6 with ultra-fast HMR

---

## 📂 Project Structure

```
portfolio/
├── netlify/
│   └── functions/
│       ├── comments.js      # Netlify serverless function for MongoDB Atlas Guestbook
│       └── contact.js       # Netlify serverless function for Contact Form email routing
├── public/
│   ├── certificates/        # Verified certificates (Microsoft, HP, Hackathon, Udemy)
│   ├── kartik.png           # Kartik's profile photo
│   └── favicon.svg          # Custom developer brand icon
├── src/
│   ├── components/
│   │   ├── About.tsx        # Engineering philosophy, COER Univ, stats
│   │   ├── Achievements.tsx # GSSoC 2026, Web Dev Quiz #1, IIT Roorkee, Hackathons
│   │   ├── BackgroundDecorations.tsx # Ambient radial glows & subtle grid
│   │   ├── Certificates.tsx # Interactive credential gallery with high-res lightbox
│   │   ├── Contact.tsx      # Side-by-side Send Email form & Public Comments (MongoDB Atlas)
│   │   ├── CVModal.tsx      # Printable & downloadable Curriculum Vitae viewer
│   │   ├── Experience.tsx   # SkillBuildEra MERN Developer Internship timeline
│   │   ├── Footer.tsx       # Quick navigation, social links, back to top
│   │   ├── Hero.tsx         # Open to Internships badge, tech badges, photo card
│   │   ├── Navbar.tsx       # Glassmorphic header, mobile drawer, CV button
│   │   ├── ProjectCard.tsx  # Project showcase card with architecture breakdown modal
│   │   ├── Projects.tsx     # Filterable tabs: All, AI SaaS, Full-Stack, Web Apps
│   │   ├── SectionHeading.tsx # Reusable section titles
│   │   ├── Skills.tsx       # Searchable competencies & category cards
│   │   └── SocialIcons.tsx  # Crisp SVG icons for GitHub & LinkedIn
│   ├── data/
│   │   └── portfolioData.ts # Single source of truth: projects, links, skills, bio
│   ├── services/
│   │   └── api.ts           # Dual-pipeline API client for Comments & Contact
│   ├── types/
│   │   └── portfolio.ts     # TypeScript data contracts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .env.local
├── netlify.toml             # Netlify deployment, redirect rules & functions config
├── package.json
├── server.js                # Local Express development API bridge
├── tailwind.config.js
└── vite.config.ts
```

---

## ⚡ Quick Start (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Open `.env.local` and configure your credentials:

```env
# Replace <db_password> with your actual MongoDB Atlas password
MONGODB_URI=mongodb+srv://kartikjoshi842_db_user:<YOUR_ACTUAL_PASSWORD>@cluster0.pwvqkig.mongodb.net/portfolio?retryWrites=true&w=majority
MONGODB_DB_NAME=portfolio

# Optional: Add free Web3Forms key to receive emails directly to kartikjoshi842@gmail.com
# Obtain in 10 seconds at https://web3forms.com
VITE_WEB3FORMS_ACCESS_KEY=your_key_here
CONTACT_RECEIVER_EMAIL=kartikjoshi842@gmail.com
```

### 3. Start Development Server
```bash
# Option A: Run Vite frontend (with mock/fallback API store)
npm run dev

# Option B: Run both frontend and local Express API concurrently
npm run dev:all
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🍃 MongoDB Atlas Configuration

1. In **MongoDB Atlas Dashboard** -> **Security** -> **Database Access**:
   Ensure user `kartikjoshi842_db_user` has `Read and write to any database` privilege.
2. In **Network Access**:
   Add IP `0.0.0.0/0` (Allow access from anywhere) so Netlify serverless functions and your local machine can connect securely.
3. Replace `<db_password>` in `.env.local` or Netlify Environment Variables.

> **Resilient Fallback Built-In:** If `<db_password>` is not yet updated, the application continues to operate seamlessly in demo mode without throwing errors.

---

## 📬 Receiving Emails from the Contact Form in Production

Your portfolio supports two out-of-the-box methods:

1. **Web3Forms (Recommended, Zero Server Maintenance):**
   - Go to [web3forms.com](https://web3forms.com)
   - Enter `kartikjoshi842@gmail.com`
   - Copy your access key into Netlify environment variable: `VITE_WEB3FORMS_ACCESS_KEY`
   - All contact messages will immediately arrive in your personal inbox!

2. **Netlify Functions + Resend / Direct API:**
   - Add `RESEND_API_KEY` to Netlify environment variables.
   - The serverless function `/netlify/functions/contact.js` will handle delivery automatically.

---

## 🌐 Deploying to Netlify

1. Push your repository to GitHub.
2. Log in to [Netlify](https://app.netlify.com/) -> **Add new site** -> **Import an existing project**.
3. Select this repository. The `netlify.toml` file automatically sets:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Under **Site configuration** -> **Environment variables**, add:
   - `MONGODB_URI`
   - `VITE_WEB3FORMS_ACCESS_KEY`
5. Click **Deploy**. Your site is live with serverless backend APIs!
