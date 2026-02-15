# 🌟 Todo Drizzle - Frontend

A beautiful, modern React frontend for the Todo Drizzle application.

## ✨ Features

- 🎨 **Modern UI/UX** with dark theme and vibrant gradients
- 💎 **Glassmorphism** design with backdrop blur effects
- 🌊 **Smooth animations** on all interactions
- ✅ **Full CRUD operations** (Create, Read, Update, Delete)
- 🔍 **Real-time search** with debouncing
- 🎯 **Status filtering** (All, Pending, Completed)
- 🔄 **Toggle todo status** between pending and completed
- 📱 **Fully responsive** design for all screen sizes
- ⚡ **Fast and lightweight** built with Vite

## 🚀 Getting Started

### Prerequisites

Make sure the backend server is running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:3000/v1/todos`

### API Endpoints Used:

- `GET /getTodos` - Fetch all todos
- `POST /add` - Add new todo
- `PATCH /update/:id` - Update todo description
- `DELETE /delete/:id` - Delete todo
- `GET /search?search=query` - Search todos
- `PATCH /toggle/:id` - Toggle todo status

## 🎨 Design Features

- **Dark Theme** with purple-to-blue gradients
- **Glassmorphism** cards with backdrop blur
- **Smooth Animations** including fade-in, slide-up, and scale effects
- **Interactive Elements** with hover effects and micro-animations
- **Custom Scrollbar** styling
- **Responsive Layout** optimized for mobile, tablet, and desktop

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Modern styling with animations
- **Google Fonts** - Inter font family

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎭 Usage

1. **Add Todo**: Type in the input field and click "Add Todo" or press Enter
2. **Complete Todo**: Click the circular checkbox to toggle status
3. **Edit Todo**: Click the edit (✏️) button, modify text, and press Enter or click Save
4. **Delete Todo**: Click the delete (🗑️) button
5. **Search**: Type in the search bar to filter todos
6. **Filter**: Use the filter tabs to view All, Pending, or Completed todos

## 🎨 Color Palette

- **Primary Gradient**: Purple (#667eea) to Violet (#764ba2)
- **Success Gradient**: Green (#11998e) to Mint (#38ef7d)
- **Danger Gradient**: Red (#eb3349) to Orange (#f45c43)
- **Background**: Deep blue with gradient overlay

---

Built with ❤️ using React and Vite
