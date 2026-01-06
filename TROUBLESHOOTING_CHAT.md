# 🔧 Troubleshooting - Chat com n8n

## 🐛 Problema: Chat retorna respostas genéricas "Entendo. Pode me contar mais sobre isso?"

Essa resposta genérica indica que o código antigo ainda está sendo executado. Siga estas etapas:

### ✅ Checklist de Solução

#### 1. **Limpar Cache Completo**

Execute no terminal:
```bash
# Parar o servidor (Ctrl+C)
# Depois executar:
npx expo start --clear
```

#### 2. **No App Expo Go (Celular)**

- Sacuda o dispositivo para abrir o menu
- Clique em **"Reload"**
- Ou **feche completamente o app** e abra novamente
- Ou **escaneie o QR code novamente**

#### 3. **Verificar Logs no Console**

Após enviar uma mensagem, você deve ver logs como:

```
🟢 [App] handleSendMessage chamado
📝 [App] Mensagem: teste
👤 [App] userId: seu@email.com
👨‍⚕️ [App] psychologistId: psi_catarina
⏳ [App] Indicador de digitação ativado
🚀 [App] Chamando sendMessageToN8N...
🔵 [n8nApi] Iniciando chamada ao n8n...
📤 [n8nApi] Dados enviados: { message: 'teste', userId: 'seu@email.com', psychologistId: 'psi_catarina' }
🌐 [n8nApi] URL: https://marcosvitor1994.app.n8n.cloud/webhook/chat/message
```

**Se NÃO ver esses logs**, o código não foi atualizado ainda. Continue para o passo 4.

#### 4. **Limpeza Mais Agressiva**

Se ainda não funcionar, tente:

```bash
# 1. Parar o servidor
# 2. Limpar tudo:
rm -rf node_modules
npm install
npx expo start --clear
```

No Windows:
```bash
# 1. Parar o servidor
# 2. Limpar tudo:
rmdir /s /q node_modules
npm install
npx expo start --clear
```

#### 5. **Verificar o Workflow do n8n**

- Acesse: https://marcosvitor1994.app.n8n.cloud
- Verifique se o workflow está **ATIVO** (botão "Active" ligado)
- Teste o webhook diretamente:

```bash
curl -X POST https://marcosvitor1994.app.n8n.cloud/webhook/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "teste",
    "psychologistId": "psi_catarina",
    "message": "Olá"
  }'
```

Deve retornar algo como:
```json
{
  "resposta": "Olá! Como posso ajudar você hoje?",
  "psicologo": "psi_catarina"
}
```

## 📊 Interpretando os Logs

### ✅ Logs Corretos (Funcionando)

```
🟢 [App] handleSendMessage chamado
📝 [App] Mensagem: teste
👤 [App] userId: user@email.com
👨‍⚕️ [App] psychologistId: psi_catarina
⏳ [App] Indicador de digitação ativado
🚀 [App] Chamando sendMessageToN8N...
🔵 [n8nApi] Iniciando chamada ao n8n...
📤 [n8nApi] Dados enviados: {...}
🌐 [n8nApi] URL: https://...
📊 [n8nApi] Status da resposta: 200
✅ [n8nApi] Resposta recebida: {...}
💬 [n8nApi] Texto da resposta: Olá! Como você está?
✨ [App] Resposta recebida da API: Olá! Como você está?
💾 [App] Adicionando resposta ao chat
✅ [App] Indicador de digitação desativado
```

### ❌ Erro de Conexão

```
❌ [n8nApi] Erro na resposta: Not Found
❌ [n8nApi] Erro na API: 404 - Not Found
```

**Solução:** Verificar se o workflow do n8n está ativo.

### ❌ Erro de CORS

```
❌ [n8nApi] Erro: Network request failed
```

**Solução:**
1. Verificar se a URL do webhook está correta
2. Verificar se o n8n está acessível
3. Testar o webhook diretamente (curl)

### ❌ Nenhum Log Aparece

**Problema:** Código não foi recarregado.

**Solução:**
1. Limpar cache: `npx expo start --clear`
2. Recarregar app no celular (sacudir e clicar em Reload)
3. Fechar e abrir o app completamente

## 🔍 Como Abrir o Console

### No Terminal (onde você rodou npx expo start):

Os logs aparecem automaticamente no terminal.

### No Metro Bundler (navegador):

1. Acesse: http://localhost:8081
2. Os logs aparecem no terminal, não no navegador

### No React Native Debugger:

1. Sacuda o celular
2. Clique em "Debug"
3. Abra as DevTools do Chrome

## 🆘 Problemas Comuns

### 1. "Desculpe, ocorreu um erro na conexão"

**Causas:**
- Workflow do n8n não está ativo
- URL do webhook incorreta
- Problemas de rede

**Solução:**
1. Verificar workflow ativo
2. Testar webhook com curl
3. Verificar logs para erro específico

### 2. "Entendo. Pode me contar mais sobre isso?" (resposta antiga)

**Causa:** Cache do Expo não foi limpo

**Solução:**
1. `npx expo start --clear`
2. Recarregar app no celular
3. Se persistir, deletar node_modules e reinstalar

### 3. Indicador de "digitando..." fica travado

**Causa:** Erro na chamada da API

**Solução:**
1. Verificar logs de erro
2. Verificar conexão com n8n
3. Verificar se a resposta tem o campo "resposta"

## 📝 Checklist Final

Antes de reportar um erro, verifique:

- [ ] Workflow do n8n está **ATIVO**
- [ ] Limpou o cache do Expo (`npx expo start --clear`)
- [ ] Recarregou o app no celular (Shake > Reload)
- [ ] Testou o webhook diretamente (curl)
- [ ] Verificou os logs no console
- [ ] O `psychologistId` existe no MongoDB
- [ ] A URL do webhook está correta no código

## 🎯 Teste Rápido

Para testar rapidamente se está funcionando:

1. **Abra o app** no celular
2. **Faça login** com qualquer email
3. **Vá para a aba "Diário"**
4. **Digite:** "teste"
5. **Envie a mensagem**
6. **Observe os logs** no terminal
7. **Aguarde a resposta** (deve vir do n8n, não a genérica)

Se a resposta for do n8n (personalizada), está funcionando! 🎉
Se for "Entendo. Pode me contar mais sobre isso?", ainda está com cache. 🔄

## 📞 Última Tentativa

Se NADA funcionar:

```bash
# 1. Parar completamente o Expo
# 2. Deletar node_modules e cache
rm -rf node_modules
rm -rf .expo
npm cache clean --force

# 3. Reinstalar
npm install

# 4. Iniciar limpo
npx expo start --clear

# 5. No celular:
# - Fechar COMPLETAMENTE o app Expo Go
# - Abrir novamente
# - Escanear o QR code
```
