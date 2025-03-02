import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/LoginSignupScreen/LoginScreen';
import SignScreen from './src/LoginSignupScreen/SignScreen';
import SignupNext from './src/LoginSignupScreen/SignupNext';
import AppNav from './src/Navigation/AppNav';
import { AuthProvider } from './src/Context/AuthContext';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider> 
        <AppNav />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
