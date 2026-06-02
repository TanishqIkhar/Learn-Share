# 📚 LearnShare — Books & Beyond

> A community-driven marketplace for students to **buy, sell, donate, and exchange** educational materials — textbooks, notes, lab equipment, and more.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-learn--share--drab.vercel.app-c41e3a?style=for-the-badge)](https://learn-share-drab.vercel.app)

![Hero](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Node](https://img.shields.io/badge/Node-18+-green) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black) ![Render](https://img.shields.io/badge/API-Render-blue)

## 🔗 Live Links

| | Link |
|--|------|
| 🌐 **Full App (Next.js)** | https://learn-share-drab.vercel.app |
| ⚙️ **API Health Check** | https://learnshare-api.onrender.com/api/health |
| 📄 **Static Site (GitHub Pages)** | https://tanishqikhar.github.io/Learn-Share/ |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | JWT login/register, Google OAuth ready |
| 📦 **Marketplace** | Create, browse, filter, and search listings |
| 🎁 **Donations** | Dedicated section for free educational materials |
| 💬 **Real-time Chat** | Socket.io messaging with typing indicators |
| ⭐ **Ratings & Trust** | Review system with reputation scores |
| 🤖 **AI Price Suggestions** | Smart pricing based on category, condition & history |
| 📊 **Recommendations** | Content-based listing recommendations |
| 🏫 **Campus Filtering** | Filter by university/college |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, Tailwind CSS, Playfair Display + Space Grotesk fonts |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (in-memory for local dev via `mongodb-memory-server`) |
| **Real-time** | Socket.io |
| **Auth** | JWT + bcrypt |
| **Images** | Cloudinary (with local fallback) |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **npm** 9+

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/learnshare.git
cd learnshare
npm run install:all
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:
- `JWT_SECRET` — any strong random string

> **No MongoDB or Cloudinary needed for local dev** — the app uses an in-memory database and local file storage by default.

### 3. Run

```bash
npm run dev
```

This starts both servers concurrently:
- **Frontend** → [http://localhost:3000](http://localhost:3000)
- **Backend API** → [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
learnshare/
├── .env.example          # Environment variables template
├── package.json          # Root scripts (npm run dev)
│
├── server/               # Express API
│   ├── config/           # DB & Cloudinary config
│   ├── controllers/      # Auth, Listing, Message, Review
│   ├── middleware/        # JWT auth guard
│   ├── models/           # Mongoose schemas
│   ├── routes/           # REST endpoints
│   ├── services/         # AI price & recommendations
│   ├── sockets/          # Socket.io chat handler
│   └── server.js         # Entry point
│
├── client/               # Next.js frontend
│   └── src/
│       ├── app/          # Pages (10 routes)
│       ├── components/   # Navbar, ListingCard, FilterSidebar
│       ├── context/      # AuthContext, SocketContext
│       └── lib/          # API helpers
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | ✅ | Secret key for signing JWTs |
| `PORT` | ❌ | API port (default: 5000) |
| `CLIENT_URL` | ❌ | Frontend URL (default: http://localhost:3000) |
| `MONGO_URI` | ❌ | MongoDB connection string (blank = in-memory) |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth secret |
| `CLOUDINARY_CLOUD_NAME` | ❌ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ❌ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ❌ | Cloudinary API secret |

---

## 📸 Screenshots

<details>
<summary>Click to expand</summary>

### Landing Page
Bold crimson hero with serif typography and floating book cards.

### Login
Split-screen layout with decorative panel.

### Marketplace
Crimson header, filter sidebar, and listing cards.

### Donate
Dark header with gold accents for free educational materials.

</details>

---

## 🗺 Roadmap

- [ ] Semantic search with AI embeddings
- [ ] Push notifications for messages
- [ ] Book barcode scanner (mobile)
- [ ] Wishlist / saved items
- [ ] Admin dashboard
- [ ] Deployment (Vercel + Railway)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for students, by students.
</p>
