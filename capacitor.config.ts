import type { CapacitorConfig } from '@capacitor/cli'

// Capacitor wraps the built web app (in `dist/`) into native iOS/Android
// binaries for the App Store and Google Play.
//
// Build the native projects once installed:
//   npm run build
//   npx cap add ios       # one-time, requires Xcode
//   npx cap add android   # one-time, requires Android Studio
//   npx cap sync          # copy the latest web build into the native shells
//   npx cap open ios      # open in Xcode to run / archive
const config: CapacitorConfig = {
  appId: 'com.poseidonholdings.academy',
  appName: 'Poseidon Academy',
  webDir: 'dist',
  backgroundColor: '#0a0a0a',
  ios: {
    contentInset: 'always',
    backgroundColor: '#0a0a0a',
  },
  android: {
    backgroundColor: '#0a0a0a',
  },
}

export default config
