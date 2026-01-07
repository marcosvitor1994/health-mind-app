import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: '1',
      time: '09:00',
      psychologist: 'Dr. João Silva',
      patient: 'Ana Costa',
      type: 'Consulta Regular',
      status: 'confirmed',
    },
    {
      id: '2',
      time: '10:00',
      psychologist: 'Dra. Maria Santos',
      patient: 'Pedro Alves',
      type: 'Primeira Consulta',
      status: 'confirmed',
    },
    {
      id: '3',
      time: '11:00',
      psychologist: 'Dr. João Silva',
      patient: 'Carla Silva',
      type: 'Consulta Regular',
      status: 'pending',
    },
    {
      id: '4',
      time: '14:00',
      psychologist: 'Dr. Carlos Oliveira',
      patient: 'Marcos Lima',
      type: 'Terapia de Casal',
      status: 'confirmed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#50C878';
      case 'pending':
        return '#FFB347';
      case 'cancelled':
        return '#FF6B6B';
      default:
        return '#999';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agenda do Dia</Text>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{appointments.length}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#50C878' }]}>
            {appointments.filter((a) => a.status === 'confirmed').length}
          </Text>
          <Text style={styles.summaryLabel}>Confirmadas</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#FFB347' }]}>
            {appointments.filter((a) => a.status === 'pending').length}
          </Text>
          <Text style={styles.summaryLabel}>Pendentes</Text>
        </View>
      </View>

      <ScrollView style={styles.list}>
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <View style={styles.appointmentHeader}>
              <View style={styles.timeContainer}>
                <Ionicons name="time" size={20} color="#4A90E2" />
                <Text style={styles.time}>{appointment.time}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(appointment.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(appointment.status) },
                  ]}
                >
                  {getStatusLabel(appointment.status)}
                </Text>
              </View>
            </View>

            <View style={styles.appointmentInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={16} color="#666" />
                <Text style={styles.infoText}>
                  Psicólogo: {appointment.psychologist}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="people" size={16} color="#666" />
                <Text style={styles.infoText}>
                  Paciente: {appointment.patient}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="document-text" size={16} color="#666" />
                <Text style={styles.infoText}>{appointment.type}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubbles" size={18} color="#4A90E2" />
                <Text style={styles.actionButtonText}>Contatar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="information-circle" size={18} color="#4A90E2" />
                <Text style={styles.actionButtonText}>Detalhes</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  list: {
    flex: 1,
    padding: 10,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
    
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
});
