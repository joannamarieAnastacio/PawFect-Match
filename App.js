import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import SplashScreen from './screens/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate app loading process
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the duration as needed
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <StackNavigator initialRouteName="GettingStarted" /> 

        )}
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
