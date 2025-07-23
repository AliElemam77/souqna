# Souqna - E-Commerce Web Application 🛍️

Souqna is a modern and responsive e-commerce platform built using **React**, **Tailwind CSS**, and **Redux Toolkit**. This project was developed as a task for the company **"Zahab w Awda"**. It demonstrates a full frontend implementation that communicates with a RESTful API to manage products, shopping cart, and product details.

## 🌐 Live Demo

> https://souqna-ugk8.vercel.app/

---

## 🚀 Features

- 🛒 View and filter products with pagination, sorting, and search
- 🔍 Detailed product page with image preview and similar products
- 🧺 Shopping cart with:
  - Add/remove products
  - Quantity management
  - Total price calculation
  - Persistent state with `localStorage`
- ⚡ Lazy loading & animations with `Framer Motion` and `React.lazy`
- 📱 Fully responsive design for all screen sizes
- 🔄 Smooth page scroll and transition animations
- 🧼 Clean, modular, and reusable components

---

## 🛠️ Tech Stack

- **React** (18+)
- **Redux Toolkit** for state management
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Lazy / Suspense** for performance
- **Axios** for API calls

---

## 📂 Project Structure

src/
├── components/
│ ├── ProductCard.jsx
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ └── Loader.jsx
├── pages/
│ ├── Home.jsx
│ ├── Products.jsx
│ └── ProductDetails.jsx
├── redux/
│ └── slice/
│ ├── productsSlice.js
│ └── cartSlice.js
├── App.jsx
├── main.jsx
└── index.css

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/AliElemam77/souqna

# 2. Navigate into the project directory
cd souqna

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```
