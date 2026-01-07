import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
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

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'client':
        return 'person';
      case 'psychologist':
        return 'medkit-outline'; // Ícone relacionado à saúde/atendimento
      case 'clinic':
        return 'business';
      default:
        return 'person';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'client':
        return 'Cliente';
      case 'psychologist':
        return 'Psicólogo';
      case 'clinic':
        return 'Clínica';
      default:
        return 'Cliente';
    }
  };

  const selectRole = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleModal(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Ícone de seleção de tipo de acesso */}
        <TouchableOpacity
          style={styles.roleIconButton}
          onPress={() => setShowRoleModal(true)}
        >
          <Ionicons name={getRoleIcon(selectedRole)} size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
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
          secureTextEntry
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

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Versão 1.0.0 - Demo</Text>
        </View>
      </ScrollView>

      {/* Modal de seleção de tipo de acesso */}
      <Modal
        visible={showRoleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRoleModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowRoleModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o tipo de acesso</Text>

            <TouchableOpacity
              style={[
                styles.roleOption,
                selectedRole === 'client' && styles.roleOptionSelected,
              ]}
              onPress={() => selectRole('client')}
            >
              <Ionicons
                name="person"
                size={32}
                color={selectedRole === 'client' ? '#4A90E2' : '#666'}
              />
              <Text
                style={[
                  styles.roleOptionText,
                  selectedRole === 'client' && styles.roleOptionTextSelected,
                ]}
              >
                Cliente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleOption,
                selectedRole === 'psychologist' && styles.roleOptionSelected,
              ]}
              onPress={() => selectRole('psychologist')}
            >
              <Ionicons
                name="medkit-outline"
                size={32}
                color={selectedRole === 'psychologist' ? '#4A90E2' : '#666'}
              />
              <Text
                style={[
                  styles.roleOptionText,
                  selectedRole === 'psychologist' && styles.roleOptionTextSelected,
                ]}
              >
                Psicólogo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleOption,
                selectedRole === 'clinic' && styles.roleOptionSelected,
              ]}
              onPress={() => selectRole('clinic')}
            >
              <Ionicons
                name="business"
                size={32}
                color={selectedRole === 'clinic' ? '#4A90E2' : '#666'}
              />
              <Text
                style={[
                  styles.roleOptionText,
                  selectedRole === 'clinic' && styles.roleOptionTextSelected,
                ]}
              >
                Clínica
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A252F', // Azul mais escuro
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  roleIconButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
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
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  roleOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#f0f7ff',
  },
  roleOptionText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginLeft: 16,
  },
  roleOptionTextSelected: {
    color: '#4A90E2',
    fontWeight: '600',
  },
});
