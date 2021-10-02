const dev = process.env.NODE_ENV !== 'production';
import Constants from 'expo-constants';
const { manifest } = Constants;

// if (Platform.OS === 'web') {
//   a = 'http://localhost:8080';
// } else {
//   a = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
// }
export const server =
  Platform.OS === 'web'
    ? 'http://localhost:8080'
    : `http://${manifest.debuggerHost.split(':').shift()}:8080`;
