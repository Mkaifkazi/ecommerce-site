# Elegant Ecommerce Store

A modern and elegant ecommerce frontend built with React, Vite, TailwindCSS, and Zustand.

## Features

- 🎨 Modern, elegant UI with smooth animations
- 🛍️ Product browsing with category filters
- 🛒 Shopping cart with persistent state
- 🔐 User authentication
- 📱 Fully responsive design
- ⚡ Fast performance with Vite

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Fake Store API** - Backend API

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Demo Credentials

- **Username:** mor_2314
- **Password:** 83r5^_

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API service layer
├── store/          # Zustand store
├── utils/          # Utility functions
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## API Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /carts` - Get all carts
- `GET /carts/:id` - Get single cart
- `POST /auth/login` - User login

## Features Overview

### Product Catalog
- Grid layout with responsive design
- Category-based filtering
- Product cards with hover effects
- Quick add to cart functionality

### Product Details
- Full product information
- Quantity selector
- Add to cart with custom quantity
- Back navigation

### Shopping Cart
- View cart items
- Update quantities
- Remove items
- Order summary with tax calculation
- Persistent cart state

### Authentication
- Login form with validation
- JWT token management
- User session persistence
- Protected routes

## License

MIT
