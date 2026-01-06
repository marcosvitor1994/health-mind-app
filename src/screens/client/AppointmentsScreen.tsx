import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

export default function AppointmentsScreen() {
  const upcomingAppointments = [
    {
      id: '1',
      date: new Date('2025-12-23T14:00:00'),
      psychologist: 'Dr. João Silva',
      type: 'Consulta Regular',
      status: 'confirmed',
    },
    {
      id: '2',
      date: new Date('2025-12-30T15:00:00'),
      psychologist: 'Dr. João Silva',
      type: 'Consulta Regular',
      status: 'pending',
    },
  ];

  const pastAppointments = [
    {
      id: '3',
      date: new Date('2025-12-20T14:00:00'),
      psychologist: 'Dr. João Silva',
      type: 'Consulta Regular',
      status: 'completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#50C878';
      case 'pending':
        return '#FFB347';
      case 'completed':
        return '#4A90E2';
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
        return 'Aguardando Confirmação';
      case 'completed':
        return 'Realizada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const AppointmentCard = ({ appointment, isPast = false }: any) => (
    <Card>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.day}>
            {appointment.date.getDate()}
          </Text>
          <Text style={styles.month}>
            {appointment.date.toLocaleDateString('pt-BR', { month: 'short' })}
          </Text>
        </View>
        <View style={styles.appointmentInfo}>
          <Text style={styles.time}>
            {appointment.date.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text style={styles.psychologist}>{appointment.psychologist}</Text>
          <Text style={styles.type}>{appointment.type}</Text>
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

      {!isPast && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={18} color="#4A90E2" />
            <Text style={styles.actionText}>Reagendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Ionicons name="close-circle" size={18} color="#FF6B6B" />
            <Text style={[styles.actionText, { color: '#FF6B6B' }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newAppointmentButton}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.newAppointmentText}>Agendar Nova Consulta</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Consultas</Text>
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultas Anteriores</Text>
          {pastAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              isPast
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  newAppointmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    
  },
  newAppointmentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  day: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  month: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
  },
  appointmentInfo: {
    flex: 1,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  psychologist: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  type: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
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
  cancelButton: {
    borderColor: '#FF6B6B',
  },
  actionText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
});
