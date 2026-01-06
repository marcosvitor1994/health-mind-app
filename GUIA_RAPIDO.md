# Guia Rápido - Health Mind App

## Início Rápido

### 1. Instalação
```bash
cd health-mind-app
npm install
```

### 2. Executar o App
```bash
npm start
```

### 3. Testar no Dispositivo
- Baixe o app **Expo Go** no seu smartphone (Android ou iOS)
- Escaneie o QR Code que aparece no terminal
- O app será carregado automaticamente

## Testando as Funcionalidades

### Login Simulado
O login aceita qualquer email e senha. Escolha um dos três tipos:

1. **Cliente** - Para ver a visão do paciente
2. **Psicólogo** - Para ver a visão do profissional
3. **Clínica** - Para ver a visão administrativa

### Navegação

Após o login, você verá tabs na parte inferior:

#### Como Cliente:
- **Diário**: Chat simulado com IA
- **Consultas**: Agendamento de sessões
- **Emergência**: Recursos de ajuda
- **Perfil**: Configurações

#### Como Psicólogo:
- **Pacientes**: Lista de pacientes
- **Agenda**: Calendário (em desenvolvimento)
- **Documentos**: Prontuários e relatórios
- **Relatórios**: Análises de chat

#### Como Clínica:
- **Visão Geral**: Dashboard
- **Psicólogos**: Equipe da clínica
- **Agenda**: Agenda geral

## Estrutura de Arquivos Importantes

```
src/
├── screens/        # Todas as telas do app
├── navigation/     # Configuração de rotas
├── contexts/       # Estado global (autenticação)
├── components/     # Componentes reutilizáveis
└── types/          # Tipos TypeScript
```

## Personalizando o App

### Cores Principais
Edite as cores no arquivo de cada tela. A cor principal é `#4A90E2`.

### Adicionar Nova Tela
1. Crie o arquivo em `src/screens/[tipo]/`
2. Adicione no navegador correspondente em `src/navigation/`
3. Configure o ícone e título

### Modificar Dados Mock
Os dados de exemplo estão diretamente nas telas. Busque por arrays como:
- `psychologists` em PsychologistsScreen
- `clients` em ClientsScreen
- `appointments` em ScheduleScreen

## Próximos Passos para Desenvolvimento

1. **Backend**: Criar API REST ou usar Firebase
2. **Autenticação**: Implementar JWT ou OAuth
3. **IA**: Integrar com OpenAI ou outra API de LLM
4. **Banco de Dados**: PostgreSQL, MongoDB ou Firebase
5. **Notificações**: Usar Expo Notifications
6. **Upload**: Implementar upload de imagens e documentos

## Comandos Úteis

```bash
# Limpar cache
npm start -- --clear

# Ver logs detalhados
npm start -- --verbose

# Executar em dispositivo específico
npm run android
npm run ios
npm run web
```

## Dicas

- Use **Expo Go** para testar no celular sem precisar compilar
- Pressione **r** no terminal para recarregar o app
- Pressione **m** para abrir o menu do desenvolvedor
- Use **React Native Debugger** para debug avançado

## Suporte

Para dúvidas sobre Expo:
- Documentação: https://docs.expo.dev/
- Fórum: https://forums.expo.dev/

Para dúvidas sobre React Navigation:
- Documentação: https://reactnavigation.org/

## Problemas Comuns

### Erro "Metro bundler failed to start"
```bash
npm start -- --reset-cache
```

### Erro de dependências
```bash
rm -rf node_modules
npm install
```

### App não carrega no Expo Go
- Verifique se está na mesma rede Wi-Fi
- Tente conectar manualmente digitando o IP
