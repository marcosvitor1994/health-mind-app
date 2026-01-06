import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import ClientNavigator from './src/navigation/ClientNavigator';
import PsychologistNavigator from './src/navigation/PsychologistNavigator';
import ClinicNavigator from './src/navigation/ClinicNavigator';
import LoginScreen from './src/screens/auth/LoginScreen';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  switch (user.role) {
    case 'client':
      return <ClientNavigator />;
    case 'psychologist':
      return <PsychologistNavigator />;
    case 'clinic':
      return <ClinicNavigator />;
    default:
      return <LoginScreen />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
