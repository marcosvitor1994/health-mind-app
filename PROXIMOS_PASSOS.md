# Próximos Passos - Health Mind

## Visão Geral

Este documento descreve os próximos passos para evoluir o Health Mind de um protótipo funcional para uma aplicação completa com backend e IA.

## Fase 1: Configuração do Backend (2-3 semanas)

### 1.1 Escolha da Stack de Backend

**Opção A - Node.js (Recomendado)**
```
- Framework: Express.js ou Fastify
- Banco: PostgreSQL + Prisma ORM
- Auth: JWT + bcrypt
- Storage: AWS S3 ou Cloudinary
```

**Opção B - Python**
```
- Framework: FastAPI
- Banco: PostgreSQL + SQLAlchemy
- Auth: JWT + passlib
- Storage: AWS S3
```

### 1.2 Estrutura do Banco de Dados

```sql
-- Tabelas principais
users (id, email, password, role, name, created_at)
clinics (id, name, address, phone, logo_url)
psychologists (id, user_id, clinic_id, crp, specialties)
clients (id, user_id, psychologist_id, registration_date)
appointments (id, client_id, psychologist_id, date, status)
documents (id, client_id, psychologist_id, type, title, content)
chat_sessions (id, client_id, created_at)
chat_messages (id, session_id, user_id, message, is_ai, timestamp)
```

### 1.3 API Endpoints Necessários

**Auth:**
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/auth/me

**Clients:**
- GET /api/clients
- GET /api/clients/:id
- POST /api/clients
- PUT /api/clients/:id
- DELETE /api/clients/:id

**Appointments:**
- GET /api/appointments
- POST /api/appointments
- PUT /api/appointments/:id
- DELETE /api/appointments/:id

**Chat:**
- GET /api/chat/sessions/:clientId
- POST /api/chat/messages
- GET /api/chat/messages/:sessionId

**Documents:**
- GET /api/documents
- POST /api/documents
- PUT /api/documents/:id
- DELETE /api/documents/:id

## Fase 2: Integração com IA (1-2 semanas)

### 2.1 Escolha do Provedor de IA

**Opção A - OpenAI (Mais popular)**
```javascript
// Exemplo
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "Você é um assistente de saúde mental..." },
    { role: "user", content: userMessage }
  ],
});
```

**Opção B - Anthropic Claude (Mais seguro)**
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [
    { role: "user", content: userMessage }
  ],
  system: "Você é um assistente de saúde mental..."
});
```

### 2.2 Sistema de Prompt

Criar prompts específicos para cada psicólogo:

```
Você é um assistente de IA treinado para atuar como suporte emocional
seguindo a abordagem do psicólogo [NOME].

Diretrizes:
- Sempre seja empático e acolhedor
- Não diagnostique condições médicas
- Incentive o paciente a falar com o psicólogo em casos graves
- Use linguagem simples e acessível
- Foque em escuta ativa

Abordagem terapêutica: [TCC/Psicanálise/etc]
Especialidades: [Ansiedade, Depressão, etc]

Informações do paciente:
[Histórico fornecido pelo psicólogo]
```

### 2.3 Implementação no Backend

```javascript
// routes/chat.js
router.post('/chat/message', async (req, res) => {
  const { clientId, message } = req.body;

  // 1. Buscar histórico do chat
  const history = await getChatHistory(clientId);

  // 2. Buscar informações do psicólogo
  const psychologist = await getPsychologistByClient(clientId);

  // 3. Montar prompt com contexto
  const systemPrompt = buildSystemPrompt(psychologist);

  // 4. Chamar IA
  const aiResponse = await callAI(systemPrompt, message, history);

  // 5. Salvar mensagens
  await saveChatMessage(clientId, message, false);
  await saveChatMessage(clientId, aiResponse, true);

  res.json({ response: aiResponse });
});
```

## Fase 3: Atualizar o App React Native

### 3.1 Criar Serviço de API

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://sua-api.com/api',
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: RegisterData) =>
    api.post('/auth/register', data),
};

export const chatService = {
  sendMessage: (clientId: string, message: string) =>
    api.post('/chat/message', { clientId, message }),
  getHistory: (clientId: string) =>
    api.get(`/chat/sessions/${clientId}`),
};
```

### 3.2 Atualizar AuthContext

```typescript
// src/contexts/AuthContext.tsx
const login = async (email: string, password: string) => {
  const response = await authService.login(email, password);
  const { token, user } = response.data;

  await AsyncStorage.setItem('token', token);
  setUser(user);
};
```

### 3.3 Atualizar ChatScreen

```typescript
// src/screens/client/ChatScreen.tsx
const handleSend = async () => {
  if (message.trim()) {
    // Adiciona mensagem do usuário
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      isAI: false,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setMessage('');

    try {
      // Chama API
      const response = await chatService.sendMessage(user.id, message);

      // Adiciona resposta da IA
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        isAI: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  }
};
```

## Fase 4: Funcionalidades Avançadas

### 4.1 Notificações Push

```bash
expo install expo-notifications
```

```typescript
// Configurar notificações
import * as Notifications from 'expo-notifications';

// Solicitar permissão
const { status } = await Notifications.requestPermissionsAsync();

// Agendar notificação
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Lembrete de Consulta",
    body: "Você tem uma consulta em 1 hora",
  },
  trigger: { seconds: 3600 },
});
```

### 4.2 Upload de Arquivos

```typescript
// src/services/upload.ts
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export const uploadImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });

  if (!result.canceled) {
    const formData = new FormData();
    formData.append('file', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);

    await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
};
```

### 4.3 Gráficos e Estatísticas

```bash
npm install react-native-chart-kit
```

```typescript
import { LineChart } from 'react-native-chart-kit';

<LineChart
  data={{
    labels: ['Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [{ data: [20, 45, 28, 80] }],
  }}
  width={Dimensions.get('window').width - 32}
  height={220}
  chartConfig={{
    backgroundColor: '#4A90E2',
    backgroundGradientFrom: '#4A90E2',
    backgroundGradientTo: '#6BA3E8',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  }}
/>
```

## Fase 5: Segurança e Compliance

### 5.1 LGPD / HIPAA Compliance

- Criptografia de dados sensíveis
- Logs de acesso
- Consentimento explícito
- Direito ao esquecimento
- Backups regulares

### 5.2 Segurança

```javascript
// Helmet.js para headers de segurança
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Sanitização de inputs
const validator = require('validator');
const sanitized = validator.escape(userInput);
```

## Fase 6: Deploy

### 6.1 Backend

**Opções:**
- Heroku (fácil, pago)
- Railway (fácil, tem free tier)
- AWS EC2 (flexível, complexo)
- DigitalOcean (intermediário)

### 6.2 Banco de Dados

**Opções:**
- Railway PostgreSQL (grátis)
- Supabase (grátis, muito bom)
- AWS RDS (pago, robusto)
- PlanetScale (MySQL, grátis)

### 6.3 App Mobile

```bash
# Build para Android
eas build --platform android

# Build para iOS (precisa de conta Apple Developer - $99/ano)
eas build --platform ios

# Ou usar Expo Application Services
npx expo-cli publish
```

## Checklist de Implementação

### Backend
- [ ] Criar projeto backend
- [ ] Configurar banco de dados
- [ ] Implementar autenticação JWT
- [ ] Criar todos os endpoints
- [ ] Implementar integração com IA
- [ ] Adicionar validações
- [ ] Implementar testes

### App
- [ ] Criar serviço de API
- [ ] Atualizar AuthContext
- [ ] Integrar chat com backend
- [ ] Implementar upload de arquivos
- [ ] Adicionar notificações
- [ ] Implementar offline-first
- [ ] Adicionar loading states
- [ ] Tratamento de erros

### Deploy
- [ ] Deploy do backend
- [ ] Deploy do banco de dados
- [ ] Configurar domínio
- [ ] SSL/HTTPS
- [ ] Build do app
- [ ] Publicar na Play Store
- [ ] Publicar na App Store

## Recursos Úteis

### Documentação
- Expo: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- OpenAI API: https://platform.openai.com/docs/
- Anthropic API: https://docs.anthropic.com/

### Tutoriais
- Full Stack React Native: https://www.youtube.com/watch?v=0-S5a0eXPoc
- JWT Auth: https://www.youtube.com/watch?v=mbsmsi7l3r4
- Expo + Backend: https://www.youtube.com/watch?v=QLjeBdItNjw

## Estimativa de Custos Mensais

### Inicial (MVP)
- Backend: $0-10 (Railway/Heroku free tier)
- Banco: $0 (Supabase free)
- IA: $10-50 (depende do uso)
- Storage: $0-5 (Cloudinary free tier)
**Total: $10-65/mês**

### Produção (100 usuários)
- Backend: $25-50
- Banco: $25
- IA: $100-300
- Storage: $10
- CDN: $10
**Total: $170-395/mês**

## Conclusão

Este guia fornece um roadmap completo para levar o Health Mind de protótipo a produção. Siga as fases em ordem e você terá um aplicativo robusto e profissional.

Boa sorte! 🚀
