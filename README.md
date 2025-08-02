# 🧘‍♀️ Peaceful Meditation

> A beautiful, cross-platform meditation app built with React Native, Expo, and TypeScript

[![Expo](https://img.shields.io/badge/Expo-~51.0.28-blue.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-green.svg)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.3.3-blue.svg)](https://www.typescriptlang.org)
[![NativeWind](https://img.shields.io/badge/NativeWind-^2.0.11-purple.svg)](https://www.nativewind.dev)

## 🌟 Features

- **🎨 Beautiful UI/UX** - Modern design with gradient overlays and nature imagery
- **🎵 Audio Meditation** - 6 nature-themed meditation sessions with ambient sounds
- **📱 Cross-Platform** - Runs on iOS, Android, and Web
- **🎯 TypeScript** - Fully typed for better development experience
- **🌙 Dark/Light Theme** - Adaptive theming for user preference
- **⚡ Performance Optimized** - Smooth animations and efficient rendering
- **♿ Accessible** - Screen reader support and accessibility features

## 🎯 Meditation Categories

1. **🏔️ Mountains** - Peaceful mountain ambiance
2. **🌊 Rivers** - Flowing water sounds
3. **🌅 Sunset** - Evening meditation under trees
4. **🏖️ Beaches** - Ocean waves and coastal breeze
5. **⭐ Starry Night** - Night sky meditation
6. **💧 Waterfall** - Cascading water sounds

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/peaceful-meditation.git

# Navigate to project directory
cd peaceful-meditation

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running the App

- **📱 Mobile**: Scan QR code with Expo Go app
- **🖥️ Web**: Press `w` in terminal or visit `http://localhost:19006`
- **📱 iOS Simulator**: Press `i` in terminal (macOS only)
- **🤖 Android Emulator**: Press `a` in terminal

## 🏗️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (file-based routing)
- **Animations**: React Native Reanimated
- **Audio**: Expo AV
- **Gradients**: Expo Linear Gradient
- **State Management**: React Context API

## 📁 Project Structure

```
peaceful-meditation/
├── app/                    # File-based routing
│   ├── (tabs)/            # Tab navigation
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Welcome screen
├── components/            # Reusable components
│   ├── AppGradient.tsx    # Gradient wrapper
│   ├── CustomButton.tsx   # Styled button
│   └── Content.tsx        # Content wrapper
├── constants/             # App constants
│   ├── meditationData.ts  # Meditation content
│   ├── Colors.ts          # Color scheme
│   └── meditation-images.ts
├── assets/               # Images and audio files
│   ├── meditation-images/
│   └── audio/
└── hooks/               # Custom React hooks
```

## 🎨 Design Philosophy

- **Minimalist Interface** - Clean, distraction-free design
- **Nature-Inspired** - Calming colors and natural imagery
- **Accessibility First** - Inclusive design for all users
- **Performance Focused** - Optimized for smooth user experience

## 🔧 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm test           # Run tests
npm run lint       # Run ESLint
```

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Jest** for unit testing

## 🚀 Deployment

### Web Deployment
```bash
# Build for web
npx expo export:web

# Deploy to Vercel/Netlify
# Upload dist folder or connect GitHub repo
```

### Mobile App Stores
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for app stores
eas build --platform all
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Nature sounds sourced from [Freesound.org](https://freesound.org)
- Images from [Unsplash](https://unsplash.com)
- Icons from [Expo Vector Icons](https://icons.expo.fyi)

## 📧 Contact

**Your Name** - your.email@example.com

Project Link: [https://github.com/yourusername/peaceful-meditation](https://github.com/yourusername/peaceful-meditation)

Live Demo: [https://peaceful-meditation.vercel.app](https://peaceful-meditation.vercel.app)

---

⭐ Star this repository if you found it helpful!
