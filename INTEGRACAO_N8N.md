# Integração do Chat com n8n

## 📋 Visão Geral

O chat do aplicativo Health Mind está integrado com o n8n para fornecer respostas inteligentes usando IA. Esta documentação explica como a integração funciona e como configurá-la.

## 🔗 Endpoint da API

**URL de Produção:**
```
https://marcosvitor1994.app.n8n.cloud/webhook/chat/message
```

⚠️ **IMPORTANTE:** Certifique-se de que o workflow no n8n está com o botão "Active" ativado, caso contrário a URL não funcionará.

## 📤 Formato da Requisição

O app envia um POST para o n8n com o seguinte corpo JSON:

```json
{
  "userId": "ID_DO_USUARIO",          // Ex: "marcos_vitor" ou email do usuário
  "psychologistId": "ID_DO_PSICOLOGO", // Ex: "psi_catarina" (deve existir no MongoDB)
  "message": "TEXTO_DO_USUARIO"        // Ex: "Estou me sentindo ansioso"
}
```

## 📥 Formato da Resposta

O n8n retorna um JSON com a resposta da IA:

```json
{
  "resposta": "Olá Marcos, percebo que você está passando por um momento difícil...",
  "psicologo": "psi_catarina"
}
```

## 🏗️ Arquitetura da Implementação

### 1. Serviço de API (`src/services/n8nApi.ts`)

Este arquivo contém a função `sendMessageToN8N` que:
- Faz a requisição POST para o n8n
- Trata erros de conexão
- Retorna apenas o texto da resposta

### 2. Integração no App (`App.tsx`)

A função `handleSendMessage` foi modificada para:
- Enviar a mensagem do usuário para o n8n
- Mostrar indicador de "digitando..." enquanto aguarda resposta
- Adicionar a resposta da IA no chat
- Tratar erros e exibir mensagens amigáveis

## 🎨 Interface do Usuário

### Indicador de Digitação

Quando a IA está processando a resposta, aparece um indicador visual com três pontos animados no estilo de mensagem da IA.

### Tratamento de Erros

Se houver erro de conexão, o usuário verá a mensagem:
```
"Desculpe, ocorreu um erro na conexão. Tente novamente em instantes."
```

## ⚙️ Configuração

### Variáveis Importantes

No arquivo `App.tsx`, você encontra:

```typescript
const userId = email || 'user_default';
const psychologistId = 'psi_catarina'; // ID do psicólogo no MongoDB
```

**Ajustes necessários:**

1. **userId**: Atualmente usa o email do usuário. Você pode ajustar conforme sua lógica de autenticação.

2. **psychologistId**: Definido como `'psi_catarina'`. Este ID deve:
   - Existir no seu banco de dados MongoDB
   - Corresponder ao psicólogo responsável pelo cliente
   - Ser ajustado conforme sua lógica de negócio

### Alterando a URL do n8n

Se precisar alterar a URL do webhook, edite o arquivo:

```typescript
// src/services/n8nApi.ts
const N8N_API_URL = 'SUA_NOVA_URL_AQUI';
```

## 🧪 Testando a Integração

1. Certifique-se de que o workflow do n8n está ativo
2. Faça login no app como cliente
3. Acesse a aba "Diário"
4. Digite uma mensagem e envie
5. Você deve ver:
   - Sua mensagem aparecendo
   - Indicador de "digitando..."
   - Resposta da IA após alguns segundos

## 🔍 Debug

### Logs no Console

O app registra erros no console. Para ver logs:

```bash
# No terminal onde está rodando o Expo
# Você verá mensagens como:
Erro ao enviar mensagem para n8n: [detalhes do erro]
```

### Testando o Endpoint Diretamente

Você pode testar o endpoint do n8n usando curl ou Postman:

```bash
curl -X POST https://marcosvitor1994.app.n8n.cloud/webhook/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "teste_user",
    "psychologistId": "psi_catarina",
    "message": "Olá, estou testando"
  }'
```

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Adicionar persistência de conversas (salvar histórico)
- [ ] Implementar sistema de autenticação real para userId
- [ ] Adicionar seleção dinâmica de psicólogo
- [ ] Implementar animação nos pontos de "digitando..."
- [ ] Adicionar scroll automático para última mensagem
- [ ] Implementar retry automático em caso de falha

## 📞 Suporte

Se tiver problemas com a integração:

1. Verifique se o workflow do n8n está ativo
2. Confirme que a URL está correta
3. Verifique se o `psychologistId` existe no MongoDB
4. Consulte os logs do console para detalhes do erro
