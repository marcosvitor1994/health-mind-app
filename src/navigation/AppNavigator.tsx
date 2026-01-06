import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/auth/LoginScreenSimple';
import ClinicNavigator from './ClinicNavigator';
import PsychologistNavigator from './PsychologistNavigator';
import ClientNavigator from './ClientNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, user } = useAuth();

  const getMainNavigator = () => {
    if (!user) return null;

    switch (user.role) {
      case 'clinic':
        return <Stack.Screen name="Main" component={ClinicNavigator} />;
      case 'psychologist':
        return <Stack.Screen name="Main" component={PsychologistNavigator} />;
      case 'client':
        return <Stack.Screen name="Main" component={ClientNavigator} />;
      default:
        return null;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          getMainNavigator()
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
