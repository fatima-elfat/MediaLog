# MediaLog
## A Personal Media Consumption Tracker

---

## Project Title & Description
**MediaLog** is a personal media consumption tracker. It is a full-stack web application designed to help users manage and organize their media consumption habits. The app provides a single, centralized platform for logging progress on TV shows, movies, books, and podcasts.

**Who it's for**: This tool is for anyone who enjoys media but struggles to keep track of their watching, reading, or listening journey across various platforms.

**Why it matters**: In today's fragmented digital world, it is easy to lose track of what episode you were on or what book you wanted to read next. This project aims to solve this problem by offering a dedicated space for users to track their progress, create schedules, and eventually share their experiences with friends.

---

## Frontend

### ✨ Quick Start

#### Prerequisites
- Node.js (v16.0 or higher)
- npm or yarn package manager

#### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MediaLog/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the client directory
   touch .env
   ```
   
   Add the following to your `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=MediaLog
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

#### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

---

### ✨ Features Implemented

#### 🏠 **Homepage**
- **Hero Section**: Compelling introduction to MediaLog with call-to-action
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Brand Identity**: Consistent color scheme and typography

#### 🔐 **Authentication System**
- **User Registration**: Complete signup flow with form validation
- **User Login**: Secure authentication with error handling
- **Form Validation**: Client-side validation with real-time feedback
- **Error Handling**: Comprehensive error messages and user guidance
- **Responsive Forms**: Mobile-optimized form layouts

#### 📊 **Dashboard**
- **Media Type Navigation**: Sidebar with books, movies, TV shows, and podcasts
- **Progress Tracking**: Visual progress bars for books and other media
- **Status Management**: Watch status for movies and TV shows
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Interactive Cards**: Hover effects and smooth transitions
- **Add Media Functionality**: Placeholder for adding new media items

#### 🧭 **Navigation**
- **Responsive Navbar**: Adapts to different screen sizes
- **Mobile Menu**: Hamburger menu for mobile devices
- **User Profile**: User avatar and profile management
- **Search Integration**: Search bar for finding media
- **Active States**: Visual feedback for current page

#### 📱 **Responsive Design**
- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Consistent responsive behavior
- **Touch-Friendly**: Appropriate touch targets for mobile
- **Flexible Layouts**: Content adapts to available space

#### 🎨 **UI/UX Features**
- **Consistent Color Palette**: Professional color scheme
- **Typography System**: Hierarchical text styling
- **Loading States**: Visual feedback during operations
- **Error States**: Clear error messaging and recovery
- **Accessibility**: ARIA labels and keyboard navigation

---

### 🛠 Technologies Used

#### **Core Framework**
- **React 18.2.0**: Modern React with hooks and functional components
- **React Router DOM 6.8.1**: Client-side routing and navigation
- **Vite 5.2.0**: Fast build tool and development server

#### **Styling & UI**
- **SCSS/Sass 1.69.5**: CSS preprocessor for maintainable styles
- **CSS Custom Properties**: Dynamic theming and variables
- **Responsive Design**: Mobile-first approach with breakpoints
- **CSS Grid & Flexbox**: Modern layout techniques

#### **State Management**
- **React Context API**: Global state management for authentication
- **React Hooks**: useState, useEffect, useCallback, useMemo
- **Local State**: Component-level state management

#### **HTTP Client**
- **Axios 1.12.2**: Promise-based HTTP client
- **Request/Response Interceptors**: Automatic token handling
- **Error Handling**: Centralized error management

#### **Development Tools**
- **ESLint 9.0.0**: Code linting and quality assurance
- **Vitest 1.0.4**: Fast unit testing framework
- **Testing Library**: React component testing utilities
- **JSdom**: DOM simulation for testing

#### **Build & Deployment**
- **Vite Build**: Optimized production builds
- **Code Splitting**: Automatic bundle optimization
- **Asset Optimization**: Image and resource optimization

---

### 📁 Project Structure

```
client/
├── public/
│   ├── favicon.svg          # Application favicon
│   └── vite.svg            # Vite default icon
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── navbar/        # Navigation component
│   │   └── searchBar/     # Search functionality
│   ├── routes/            # Page components
│   │   ├── dashBoard/     # Main dashboard
│   │   ├── homePage/      # Landing page
│   │   ├── login/         # Authentication
│   │   ├── register/      # User registration
│   │   └── layout/        # App layout wrapper
│   ├── context/           # React Context providers
│   ├── lib/              # Utility libraries
│   │   └── apiRequest.js  # HTTP client configuration
│   ├── utils/            # Helper functions
│   ├── assets/           # Static assets
│   ├── test/             # Test configuration
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Application entry point
│   └── index.scss        # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── vitest.config.js      # Testing configuration
└── README.md            # This file

---

### 🧪 Testing

The frontend includes comprehensive testing setup:

#### **Test Configuration**
- **Vitest**: Fast unit testing framework
- **Testing Library**: React component testing utilities
- **JSdom**: DOM simulation for browser environment
- **Coverage Reports**: Code coverage analysis

#### **Running Tests**
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

#### **Test Coverage**
- Component rendering tests
- User interaction tests
- Form validation tests
- Error handling tests
- Responsive behavior tests

---
