import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

interface Message {
  id: string;
  text: string;
  sender: 'client' | 'psychologist';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export default function PsychologistChatScreen({ navigation }: any) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Como posso ajudar?',
      sender: 'psychologist',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
    },
    {
      id: '2',
      text: 'Oi, Dr. João. Estou me sentindo um pouco ansioso hoje.',
      sender: 'client',
      timestamp: new Date(Date.now() - 3000000),
      status: 'read',
    },
    {
      id: '3',
      text: 'Entendo. Conte-me mais sobre o que está acontecendo. O que você está sentindo especificamente?',
      sender: 'psychologist',
      timestamp: new Date(Date.now() - 2700000),
      status: 'read',
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'client',
        timestamp: new Date(),
        status: 'sent',
      };

      setMessages([...messages, newMessage]);
      setMessage('');

      // Simular resposta do psicólogo após 2 segundos
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Obrigado por compartilhar. Estou aqui para te apoiar. Vamos trabalhar nisso juntos.',
          sender: 'psychologist',
          timestamp: new Date(),
          status: 'sent',
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  const formatTimestamp = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return 'checkmark';
      case 'delivered':
        return 'checkmark-done';
      case 'read':
        return 'checkmark-done';
      default:
        return 'time';
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <Header
        title="Dr. João Silva"
        subtitle="Online"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'client'
                ? styles.clientBubble
                : styles.psychologistBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.sender === 'client'
                  ? styles.clientText
                  : styles.psychologistText,
              ]}
            >
              {msg.text}
            </Text>
            <View style={styles.messageFooter}>
              <Text
                style={[
                  styles.timestamp,
                  msg.sender === 'client'
                    ? styles.clientTimestamp
                    : styles.psychologistTimestamp,
                ]}
              >
                {formatTimestamp(msg.timestamp)}
              </Text>
              {msg.sender === 'client' && (
                <Ionicons
                  name={getStatusIcon(msg.status)}
                  size={14}
                  color={msg.status === 'read' ? '#4A90E2' : '#fff'}
                  style={styles.statusIcon}
                />
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={24}
              color={message.trim() ? '#4A90E2' : '#ccc'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>
          Este chat é confidencial e seguro
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    marginBottom: 12,
    borderRadius: 16,
    padding: 12,
  },
  clientBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  psychologistBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  clientText: {
    color: '#fff',
  },
  psychologistText: {
    color: '#333',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: 11,
  },
  clientTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  psychologistTimestamp: {
    color: '#999',
  },
  statusIcon: {
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  hint: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});
