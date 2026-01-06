import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

export default function ReportsScreen() {
  const reports = [
    {
      id: '1',
      client: 'Ana Costa',
      title: 'Análise de Chat - Novembro',
      date: '2025-11-30',
      sessions: 12,
      sentiment: 'positive',
    },
    {
      id: '2',
      client: 'Pedro Alves',
      title: 'Análise de Chat - Dezembro',
      date: '2025-12-15',
      sessions: 3,
      sentiment: 'neutral',
    },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'happy';
      case 'neutral':
        return 'remove-circle';
      case 'negative':
        return 'sad';
      default:
        return 'help-circle';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '#50C878';
      case 'neutral':
        return '#FFB347';
      case 'negative':
        return '#FF6B6B';
      default:
        return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Relatórios de Chat</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color="#4A90E2" />
            <Text style={styles.infoTitle}>Sobre os Relatórios</Text>
          </View>
          <Text style={styles.infoText}>
            Os relatórios são gerados automaticamente analisando as conversas
            dos pacientes com o agente de IA. Eles fornecem insights sobre o
            estado emocional e temas recorrentes.
          </Text>
        </Card>

        {reports.map((report) => (
          <Card key={report.id}>
            <View style={styles.reportHeader}>
              <View
                style={[
                  styles.sentimentIcon,
                  { backgroundColor: getSentimentColor(report.sentiment) + '20' },
                ]}
              >
                <Ionicons
                  name={getSentimentIcon(report.sentiment) as any}
                  size={28}
                  color={getSentimentColor(report.sentiment)}
                />
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.clientName}>{report.client}</Text>
                <Text style={styles.reportTitle}>{report.title}</Text>
              </View>
            </View>

            <View style={styles.reportDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {new Date(report.date).toLocaleDateString('pt-BR')}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="chatbubbles" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {report.sessions} sessões de chat
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Ver Relatório Completo</Text>
              <Ionicons name="chevron-forward" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </Card>
        ))}

        <Card style={styles.emptyCard}>
          <Ionicons name="document-text" size={48} color="#ccc" />
          <Text style={styles.emptyTitle}>Gerar Novo Relatório</Text>
          <Text style={styles.emptyText}>
            Selecione um paciente para gerar um relatório de análise de chat
          </Text>
          <TouchableOpacity style={styles.generateButton}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.generateButtonText}>Gerar Relatório</Text>
          </TouchableOpacity>
        </Card>
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
  filterButton: {
    padding: 4,
  },
  list: {
    flex: 1,
    padding: 10,
  },
  infoCard: {
    backgroundColor: '#E8F4FD',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sentimentIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInfo: {
    marginLeft: 12,
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  reportTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  reportDetails: {
    flexDirection: 'row',
    
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#E8F4FD',
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    
  },
  generateButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
