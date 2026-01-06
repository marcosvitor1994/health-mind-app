import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

export default function EmergencyScreen({ navigation }: any) {
  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleWhatsApp = (number: string) => {
    Linking.openURL(`https://wa.me/${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.alertCard}>
        <Ionicons name="alert-circle" size={48} color="#FF6B6B" />
        <Text style={styles.alertTitle}>Em caso de emergência</Text>
        <Text style={styles.alertText}>
          Se você está passando por uma crise ou pensando em se machucar,
          procure ajuda imediata pelos canais abaixo.
        </Text>
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seu Psicólogo</Text>
        <Card>
          <View style={styles.contactHeader}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color="#fff" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>Dr. João Silva</Text>
              <Text style={styles.contactRole}>Psicólogo - CRP 06/123456</Text>
            </View>
          </View>

          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={() => handleCall('11987654321')}
            >
              <Ionicons name="call" size={24} color="#fff" />
              <Text style={styles.emergencyButtonText}>Ligar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.emergencyButton, styles.whatsappButton]}
              onPress={() => handleWhatsApp('5511987654321')}
            >
              <Ionicons name="logo-whatsapp" size={24} color="#fff" />
              <Text style={styles.emergencyButtonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => navigation.navigate('PsychologistChat')}
          >
            <Ionicons name="chatbubbles" size={20} color="#4A90E2" />
            <Text style={styles.chatButtonText}>Enviar Mensagem no App</Text>
            <Ionicons name="chevron-forward" size={20} color="#4A90E2" />
          </TouchableOpacity>

          <View style={styles.availability}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.availabilityText}>
              Disponível: Seg-Sex, 9h às 18h
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recursos de Emergência</Text>

        <Card>
          <TouchableOpacity
            style={styles.resourceItem}
            onPress={() => handleCall('188')}
          >
            <View style={styles.resourceIcon}>
              <Ionicons name="call" size={24} color="#4A90E2" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>CVV - 188</Text>
              <Text style={styles.resourceDescription}>
                Centro de Valorização da Vida - 24h
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity
            style={styles.resourceItem}
            onPress={() => handleCall('192')}
          >
            <View style={styles.resourceIcon}>
              <Ionicons name="medkit" size={24} color="#FF6B6B" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>SAMU - 192</Text>
              <Text style={styles.resourceDescription}>
                Atendimento médico de urgência - 24h
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity
            style={styles.resourceItem}
            onPress={() => handleCall('190')}
          >
            <View style={styles.resourceIcon}>
              <Ionicons name="shield" size={24} color="#FFB347" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>Polícia - 190</Text>
              <Text style={styles.resourceDescription}>
                Em caso de risco imediato
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        </Card>
      </View>

      <Card style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color="#4A90E2" />
        <Text style={styles.infoText}>
          Lembre-se: buscar ajuda é um ato de coragem. Você não está sozinho(a).
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  alertCard: {
    margin: 16,
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 12,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  contactRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  contactButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  emergencyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F4FD',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    flex: 1,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  availabilityText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  resourceDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  infoCard: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
});
