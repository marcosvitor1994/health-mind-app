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

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Olá! Como você está se sentindo hoje?',
      isAI: true,
      timestamp: new Date('2025-12-22T10:00:00'),
    },
    {
      id: '2',
      text: 'Estou me sentindo um pouco ansioso hoje.',
      isAI: false,
      timestamp: new Date('2025-12-22T10:01:00'),
    },
    {
      id: '3',
      text: 'Entendo. Você pode me contar o que está causando essa ansiedade?',
      isAI: true,
      timestamp: new Date('2025-12-22T10:01:30'),
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        isAI: false,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Obrigado por compartilhar isso comigo. Como isso está afetando seu dia a dia?',
          isAI: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <View style={styles.aiIndicator}>
          <View style={styles.aiDot} />
          <Text style={styles.aiText}>Assistente IA</Text>
        </View>
        <Text style={styles.subtitle}>Seu diário pessoal</Text>
      </View>

      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.isAI ? styles.aiMessageWrapper : styles.userMessageWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.isAI ? styles.aiMessage : styles.userMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.isAI ? styles.aiMessageText : styles.userMessageText,
                ]}
              >
                {msg.text}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  msg.isAI ? styles.aiTimestamp : styles.userTimestamp,
                ]}
              >
                {msg.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva como você está se sentindo..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={message.trim() ? '#fff' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#50C878',
    marginRight: 8,
  },
  aiText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  aiMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#4A90E2',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  aiMessageText: {
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  aiTimestamp: {
    color: '#999',
  },
  userTimestamp: {
    color: '#E8F4FD',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});
