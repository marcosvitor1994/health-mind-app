import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Header from '../../components/Header';

interface Appointment {
  id: string;
  time: string;
  patientName: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

interface AppointmentsByDate {
  [date: string]: Appointment[];
}

export default function PsychScheduleScreen() {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    time: '',
    patientName: '',
    type: 'Consulta Regular',
  });

  // Mock de compromissos
  const [appointments, setAppointments] = useState<AppointmentsByDate>({
    '2026-01-05': [
      {
        id: '1',
        time: '09:00',
        patientName: 'Maria Santos',
        type: 'Consulta Regular',
        status: 'confirmed',
      },
      {
        id: '2',
        time: '10:30',
        patientName: 'João Silva',
        type: 'Primeira Consulta',
        status: 'confirmed',
      },
      {
        id: '3',
        time: '14:00',
        patientName: 'Ana Costa',
        type: 'Retorno',
        status: 'pending',
      },
    ],
    '2026-01-06': [
      {
        id: '4',
        time: '11:00',
        patientName: 'Pedro Oliveira',
        type: 'Consulta Regular',
        status: 'confirmed',
      },
    ],
    '2026-01-08': [
      {
        id: '5',
        time: '15:00',
        patientName: 'Carlos Mendes',
        type: 'Avaliação',
        status: 'confirmed',
      },
      {
        id: '6',
        time: '16:30',
        patientName: 'Julia Rocha',
        type: 'Consulta Regular',
        status: 'pending',
      },
    ],
  });

  // Marcar datas com compromissos
  const markedDates = Object.keys(appointments).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: '#4A90E2',
      selected: date === selectedDate,
      selectedColor: '#4A90E2',
    };
    return acc;
  }, {} as any);

  // Adiciona a data selecionada mesmo que não tenha compromissos
  if (!markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#4A90E2',
    };
  }

  const handleAddAppointment = () => {
    if (newAppointment.time && newAppointment.patientName) {
      const newAppt: Appointment = {
        id: Date.now().toString(),
        time: newAppointment.time,
        patientName: newAppointment.patientName,
        type: newAppointment.type,
        status: 'pending',
      };

      setAppointments({
        ...appointments,
        [selectedDate]: [...(appointments[selectedDate] || []), newAppt].sort(
          (a, b) => a.time.localeCompare(b.time)
        ),
      });

      setNewAppointment({ time: '', patientName: '', type: 'Consulta Regular' });
      setShowAddModal(false);
    }
  };

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const renderDayAppointments = () => {
    const dayAppointments = appointments[selectedDate] || [];

    if (dayAppointments.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum compromisso agendado</Text>
          <Text style={styles.emptySubtext}>
            Toque no botão + para adicionar
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.appointmentsList}>
        {dayAppointments.map((appt) => (
          <Card key={appt.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={20} color="#4A90E2" />
                <Text style={styles.appointmentTime}>{appt.time}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(appt.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(appt.status) },
                  ]}
                >
                  {getStatusText(appt.status)}
                </Text>
              </View>
            </View>

            <Text style={styles.patientName}>{appt.patientName}</Text>
            <Text style={styles.appointmentType}>{appt.type}</Text>

            <View style={styles.appointmentActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="pencil" size={18} color="#4A90E2" />
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="checkmark-circle" size={18} color="#50C878" />
                <Text style={styles.actionButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="close-circle" size={18} color="#FF6B6B" />
                <Text style={styles.actionButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Agenda"
        subtitle="Gerencie seus compromissos"
        rightIcon="add-circle"
        rightAction={() => setShowAddModal(true)}
      />

      {/* Seletor de Visualização */}
      <View style={styles.viewSelector}>
        <TouchableOpacity
          style={[
            styles.viewButton,
            viewMode === 'day' && styles.viewButtonActive,
          ]}
          onPress={() => setViewMode('day')}
        >
          <Text
            style={[
              styles.viewButtonText,
              viewMode === 'day' && styles.viewButtonTextActive,
            ]}
          >
            Dia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewButton,
            viewMode === 'week' && styles.viewButtonActive,
          ]}
          onPress={() => setViewMode('week')}
        >
          <Text
            style={[
              styles.viewButtonText,
              viewMode === 'week' && styles.viewButtonTextActive,
            ]}
          >
            Semana
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewButton,
            viewMode === 'month' && styles.viewButtonActive,
          ]}
          onPress={() => setViewMode('month')}
        >
          <Text
            style={[
              styles.viewButtonText,
              viewMode === 'month' && styles.viewButtonTextActive,
            ]}
          >
            Mês
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendário */}
      <Calendar
        style={styles.calendar}
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#4A90E2',
          selectedDayBackgroundColor: '#4A90E2',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#4A90E2',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#4A90E2',
          selectedDotColor: '#ffffff',
          arrowColor: '#4A90E2',
          monthTextColor: '#2d4150',
          indicatorColor: '#4A90E2',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />

      {/* Data Selecionada */}
      <View style={styles.selectedDateContainer}>
        <Ionicons name="calendar" size={20} color="#4A90E2" />
        <Text style={styles.selectedDateText}>
          {new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Lista de Compromissos do Dia */}
      {renderDayAppointments()}

      {/* Modal de Adicionar Compromisso */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Compromisso</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Horário</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: 09:00"
              value={newAppointment.time}
              onChangeText={(text) =>
                setNewAppointment({ ...newAppointment, time: text })
              }
            />

            <Text style={styles.modalLabel}>Paciente</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do paciente"
              value={newAppointment.patientName}
              onChangeText={(text) =>
                setNewAppointment({ ...newAppointment, patientName: text })
              }
            />

            <Text style={styles.modalLabel}>Tipo de Consulta</Text>
            <View style={styles.typeSelector}>
              {['Consulta Regular', 'Primeira Consulta', 'Retorno', 'Avaliação'].map(
                (type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      newAppointment.type === type && styles.typeButtonActive,
                    ]}
                    onPress={() =>
                      setNewAppointment({ ...newAppointment, type })
                    }
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        newAppointment.type === type &&
                          styles.typeButtonTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddAppointment}
            >
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Adicionar Compromisso</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  viewButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewButtonActive: {
    backgroundColor: '#4A90E2',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  viewButtonTextActive: {
    color: '#fff',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  appointmentsList: {
    flex: 1,
    padding: 16,
  },
  appointmentCard: {
    marginBottom: 12,
    padding: 16,
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
  appointmentTime: {
    fontSize: 18,
    fontWeight: 'bold',
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
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  appointmentType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginRight: 8,
    marginBottom: 8,
  },
  typeButtonActive: {
    backgroundColor: '#4A90E2',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#4A90E2',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
