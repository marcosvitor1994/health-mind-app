import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import { useAuth } from '../../contexts/AuthContext';

export default function OverviewScreen() {
  const { user } = useAuth();

  const StatCard = ({
    icon,
    title,
    value,
    color,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    value: string;
    color: string;
  }) => (
    <Card style={styles.statCard}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo(a),</Text>
        <Text style={styles.clinicName}>{user?.name}</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          icon="people"
          title="Psicólogos"
          value="12"
          color="#4A90E2"
        />
        <StatCard
          icon="calendar"
          title="Consultas Hoje"
          value="24"
          color="#50C878"
        />
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          icon="person"
          title="Pacientes Ativos"
          value="156"
          color="#FFB347"
        />
        <StatCard
          icon="trending-up"
          title="Taxa Ocupação"
          value="85%"
          color="#9B59B6"
        />
      </View>

      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Ionicons name="business" size={24} color="#4A90E2" />
          <Text style={styles.infoTitle}>Informações da Clínica</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#666" />
          <Text style={styles.infoText}>Rua Exemplo, 123 - São Paulo, SP</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#666" />
          <Text style={styles.infoText}>(11) 98765-4321</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#666" />
          <Text style={styles.infoText}>contato@clinica.com.br</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Próximas Ações</Text>
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionLeft}>
            <Ionicons name="document-text" size={24} color="#4A90E2" />
            <Text style={styles.actionText}>Relatório Mensal</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionLeft}>
            <Ionicons name="settings" size={24} color="#4A90E2" />
            <Text style={styles.actionText}>Configurações</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  clinicName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 10,
    
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  infoCard: {
    margin: 10,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
});
