# AI Chat Assistant

A modern, production-ready AI chat assistant built with React Native and Expo, featuring voice capabilities, animated avatar, and beautiful themes.

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/bdfcc46d-ba6f-4467-a745-0c56d1c7ae9f" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/01c3ed4c-1994-4ca3-8bb3-2dad7e1339a6" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/86670d2c-e470-454b-a100-611570e6a7e3" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/25e32ce8-c89d-4d28-a258-33a0da3059ee" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/9dee0c12-41dd-47b5-b2d6-ed4743db868e" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/f23baf9b-7f4d-47e0-b4d4-a66429c16b04" width="250"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/350fb4bb-de02-4c9a-aa2a-7c3ceb007b95" width="250"/></td>
  </tr>
</table>



## Features

### Core Functionality
- **Modern Chat Interface**: Beautiful message bubbles with smooth animations
- **Voice Input/Output**: Record voice messages and receive spoken responses
- **Animated AI Avatar**: Expressive avatar with 5 emotional states
- **Theme System**: Light, dark, and system themes with persistence
- **Google Gemini Integration**: Powered by advanced AI with streaming responses
- **Real-time Messaging**: Optimized performance with virtualized chat history

### Technical Highlights
- **Cross-platform**: iOS, Android, and Web support
- **TypeScript**: Fully typed with strict type checking
- **Performance Optimized**: Virtualized lists, efficient animations
- **Modern Architecture**: Clean component structure with custom hooks
- **Error Handling**: Comprehensive error handling for all API calls
- **Responsive Design**: Optimized for all screen sizes

## Architecture

```
/src
  /components     # Reusable UI components
  /screens       # Screen components
  /services      # API and external service integrations
  /hooks         # Custom React hooks
  /store         # State management with Zustand
  /types         # TypeScript type definitions
  /constants     # App constants and configurations
```

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Add your Google Gemini API key to `.env`:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

### Voice Configuration
The app includes configurable voice settings:
- Language selection
- Speech rate and pitch
- Voice selection (platform dependent)

## Platform-Specific Features

### Mobile (iOS/Android)
- Full voice recording capabilities
- Haptic feedback
- Background audio support
- Native speech synthesis

### Web
- Visual feedback for voice features
- Web Speech API fallback
- Responsive design adaptations

## Performance Optimizations

- **Virtualized Lists**: Efficient rendering of large chat histories
- **Memoized Components**: Optimized re-renders
- **Lazy Loading**: Components loaded on demand
- **Animation Optimization**: Hardware-accelerated animations
- **Memory Management**: Automatic cleanup of resources

## State Management

Uses Zustand for lightweight, efficient state management:
- Chat messages and history
- Theme preferences
- Avatar emotional states
- Voice recording state
- Loading states

## Error Handling

Comprehensive error handling includes:
- API call failures with user-friendly messages
- Voice permission handling
- Network connectivity issues
- Invalid API key detection
- Graceful degradation for unsupported features

## Testing Strategy

### Unit Tests
- Service layer functions
- Custom hooks
- Utility functions

### Integration Tests
- API integrations
- Voice service functionality
- Theme switching

### E2E Tests
- Complete chat flows
- Voice message workflows
- Theme persistence

## Build Instructions

### Development Build
```bash
npm run dev
```

### Production Build
```bash
# Web
npm run build:web

# Mobile (requires EAS CLI)
eas build --platform all
```

### Preview Deployment
```bash
# Web preview
expo export --platform web
```

## API Documentation

### Gemini Service
- `generateResponse(message: string)`: Generate single response
- `generateStreamingResponse(message: string)`: Stream response chunks
- `generateWithContext(messages: Message[])`: Context-aware responses

### Voice Service
- `speak(text: string, options?: VoiceConfig)`: Text-to-speech
- `stopSpeaking()`: Stop current speech
- `getAvailableVoices()`: Get system voices

### Audio Service
- `startRecording()`: Begin voice recording
- `stopRecording()`: End recording and return URI
- `playAudio(uri: string)`: Play audio file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow TypeScript and ESLint guidelines
4. Add tests for new features
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Check the GitHub Issues
- Review the documentation
- Ensure proper API key configuration

---

Built with ❤️ using Expo, React Native, and Google Gemini AI
