# Timer & Stopwatch App

A modern, responsive React-based timer and stopwatch application built with Vite, TypeScript, and Tailwind CSS.

## 📋 Project Description

This is a comprehensive timer and stopwatch application that allows users to create multiple timers, manage them simultaneously, and use a full-featured stopwatch with lap functionality. The app features a clean, mobile-responsive design with persistent data storage.

## ✨ Features

### Timer Features
- **Create Multiple Timers**: Add custom timers with title, description, and duration
- **Simultaneous Timer Support**: Run multiple timers at the same time
- **Timer Controls**: Start, pause, restart, edit, and delete timers
- **Audio Notifications**: Sound alerts when timers complete
- **Progress Visualization**: Visual progress bars for each timer
- **Persistent Storage**: Timers are saved to localStorage and restored on app reload

### Stopwatch Features
- **Start/Stop/Reset**: Basic stopwatch functionality
- **Lap Times**: Record and display lap times with timestamps
- **Clear Laps**: Remove all recorded lap times
- **Precision Timing**: Accurate time tracking with millisecond precision

### UI/UX Features
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Bottom Navigation**: Easy navigation between Timer and Stopwatch on mobile
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Form Validation**: Real-time validation with helpful error messages
- **Toast Notifications**: User-friendly success and error messages

### Technical Features
- **Reusable Components**: Modular component architecture with shared modal and button components
- **Type Safety**: Full TypeScript implementation
- **State Management**: Zustand for efficient state management
- **Local Storage**: Automatic data persistence
- **Unit Testing**: Comprehensive test coverage with Vitest
- **Audio Management**: Singleton audio service for timer notifications

## 🚀 How to Run

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Code_Walnut
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI interface
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing**: Vitest + Testing Library
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **Audio**: Web Audio API

## 📱 Usage

### Creating Timers
1. Navigate to the Timer tab
2. Click "Add Timer" button
3. Fill in timer details (title, description, duration)
4. Click "Add Timer" to create

### Managing Timers
- **Start/Pause**: Click the play/pause button on any timer
- **Edit**: Click the edit icon to modify timer details
- **Restart**: Click the restart icon to reset timer to original duration
- **Delete**: Click the trash icon to remove timer

### Using Stopwatch
1. Navigate to the Stopwatch tab
2. Click "Start" to begin timing
3. Click "Lap" to record lap times while running
4. Click "Stop" to pause, "Reset" to clear time
5. Use "Clear Laps" to remove all recorded laps

## 🧪 Testing

The app includes comprehensive unit tests for:
- Timer store logic and state management
- Stopwatch utility functions
- Component functionality
- Form validation
- Audio management

Run tests with:
```bash
npm run test
```

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── store/              # State management (Zustand)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and services
└── App.tsx             # Main application component
```

## 🎯 Key Features Implemented

1. **Multiple Simultaneous Timers** - Fixed timer logic to support running multiple timers concurrently
2. **Audio Notifications** - Implemented persistent audio alerts with manual dismiss functionality
3. **Data Persistence** - Added localStorage integration for timer data
4. **Mobile Responsive Design** - Created bottom navigation and responsive layouts
5. **Reusable Components** - Extracted common modal and button components
6. **Form Validation** - Added real-time validation with error notifications
7. **Comprehensive Testing** - Unit tests for core functionality
8. **Modern UI/UX** - Clean, intuitive design with smooth user interactions
