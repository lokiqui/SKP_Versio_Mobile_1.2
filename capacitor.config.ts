import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.clinica',
  appName: 'clinica',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
