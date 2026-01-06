import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

export default function DocumentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const documents = [
    {
      id: '1',
      type: 'anamnesis',
      title: 'Anamnese - Ana Costa',
      client: 'Ana Costa',
      date: '2025-11-15',
      status: 'completed',
    },
    {
      id: '2',
      type: 'session_report',
      title: 'Relatório de Sessão #12',
      client: 'Ana Costa',
      date: '2025-12-20',
      status: 'completed',
    },
    {
      id: '3',
      type: 'evaluation',
      title: 'Avaliação Inicial - Pedro Alves',
      client: 'Pedro Alves',
      date: '2025-12-10',
      status: 'completed',
    },
    {
      id: '4',
      type: 'session_report',
      title: 'Relatório de Sessão #3',
      client: 'Pedro Alves',
      date: '2025-12-21',
      status: 'draft',
    },
  ];

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'anamnesis':
        return 'clipboard';
      case 'session_report':
        return 'document-text';
      case 'evaluation':
        return 'stats-chart';
      default:
        return 'document';
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'anamnesis':
        return 'Anamnese';
      case 'session_report':
        return 'Relatório de Sessão';
      case 'evaluation':
        return 'Avaliação';
      default:
        return 'Documento';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? '#50C878' : '#FFB347';
  };

  const getStatusLabel = (status: string) => {
    return status === 'completed' ? 'Completo' : 'Rascunho';
  };

  const FilterButton = ({ value, label }: { value: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === value && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(value)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === value && styles.filterTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Documentos</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={28} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <FilterButton value="all" label="Todos" />
        <FilterButton value="anamnesis" label="Anamneses" />
        <FilterButton value="session_report" label="Relatórios" />
        <FilterButton value="evaluation" label="Avaliações" />
      </ScrollView>

      <ScrollView style={styles.list}>
        {documents.map((document) => (
          <Card key={document.id}>
            <View style={styles.documentHeader}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={getDocumentIcon(document.type) as any}
                  size={24}
                  color="#4A90E2"
                />
              </View>
              <View style={styles.documentInfo}>
                <Text style={styles.documentTitle}>{document.title}</Text>
                <Text style={styles.documentType}>
                  {getDocumentTypeLabel(document.type)}
                </Text>
              </View>
            </View>

            <View style={styles.documentDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="person" size={16} color="#666" />
                <Text style={styles.detailText}>{document.client}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {new Date(document.date).toLocaleDateString('pt-BR')}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(document.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(document.status) },
                  ]}
                >
                  {getStatusLabel(document.status)}
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="eye" size={18} color="#4A90E2" />
                <Text style={styles.actionText}>Visualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create" size={18} color="#4A90E2" />
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.shareButton]}>
                <Ionicons name="share" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    padding: 4,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    flex: 1,
    padding: 10,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F4FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  documentType: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  documentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
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
  shareButton: {
    flex: 0,
    paddingHorizontal: 12,
    borderColor: '#ddd',
  },
  actionText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
});
