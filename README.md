# Rohit Kumar's Portfolio - Professional Product & Data Strategy

A modern, high-performance portfolio featuring dynamic animations, algorithmic art, and a custom admin management system.

## 🚀 Live Demo
- **Frontend**: [https://rohit20ek.github.io/portfolio-product/](https://rohit20ek.github.io/portfolio-product/)
- **Backend**: Hosted on Render (Free Tier)

---

## 🛠 Deployment Guide (Free Tier)

This project is configured to run for $0/month using GitHub Pages, Render, and Supabase.

### 1. Database (Supabase)
1. Create a free project at [Supabase](https://supabase.com/).
2. Go to **Settings -> Database** and copy the **Connection String** (URI).
3. Ensure it looks like `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`.

### 2. Backend (Render)
1. Create a free account at [Render](https://render.com/).
2. Create a new **Web Service**.
3. Connect your GitHub repository `portfolio-product`.
4. Set the following configurations:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add the following **Environment Variables**:
   - `DATABASE_URL`: (Your Supabase connection string)
   - `SESSION_SECRET`: (Any long random string)
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://rohit20ek.github.io/portfolio-product`
   - `GOOGLE_CLIENT_ID`: (From Google Cloud Console)
   - `GOOGLE_CLIENT_SECRET`: (From Google Cloud Console)
   - `GOOGLE_CALLBACK_URL`: `https://[YOUR-RENDER-URL].onrender.com/api/auth/google/callback`

### 3. Frontend (GitHub Pages)
1. Go to your repository **Settings -> Pages**.
2. Under **Build and deployment -> Source**, select **GitHub Actions**.
3. Go to **Settings -> Secrets and variables -> Actions**.
4. Add a **New repository secret**:
   - `VITE_API_URL`: (Your Render Web Service URL, e.g., `https://portfolio-backend.onrender.com`)
5. Push your code to the `main` branch. The GitHub Action will automatically build and deploy the site.

---

## 💻 Local Development

1. **Clone the repo**:
   ```bash
   git clone https://github.com/Rohit20ek/portfolio-product.git
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your local or Supabase DB URL
   node server.js
   ```

3. **Setup Frontend**:
   ```bash
   # In a new terminal
   cd portfolio
   npm install
   npm run dev -- --port 5173
   ```

---

## ✨ Features
- **Algo Art**: 3 canvas-based mathematical art variants (Flow, Web, Pulse).
- **Admin Mode**: Shift + Ctrl + A to edit work experience, projects, and testimonials.
- **Feedback System**: Real-time upvotes and comments powered by PostgreSQL.
- **Dynamic Timeline**: Animated scroll-reveal journey.
