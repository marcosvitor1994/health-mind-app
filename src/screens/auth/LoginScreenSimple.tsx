import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, selectedRole);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Mind</Text>
        <Text style={styles.subtitle}>Cuidando da sua mente</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Tipo de Acesso</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={selectedRole === 'client' ? styles.roleButtonActive : styles.roleButton}
            onPress={() => setSelectedRole('client')}
          >
            <Text style={selectedRole === 'client' ? styles.roleButtonTextActive : styles.roleButtonText}>
              Cliente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedRole === 'psychologist' ? styles.roleButtonActive : styles.roleButton}
            onPress={() => setSelectedRole('psychologist')}
          >
            <Text style={selectedRole === 'psychologist' ? styles.roleButtonTextActive : styles.roleButtonText}>
              Psicólogo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={selectedRole === 'clinic' ? styles.roleButtonActive : styles.roleButton}
            onPress={() => setSelectedRole('clinic')}
          >
            <Text style={selectedRole === 'clinic' ? styles.roleButtonTextActive : styles.roleButtonText}>
              Clínica
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versão 1.0.0 - Demo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  roleButtonActive: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  roleButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  roleButtonTextActive: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});
