# Health Mind App

Aplicativo mobile para autocuidado mental, desenvolvido com React Native e Expo.

## Sobre o Projeto

O Health Mind é uma plataforma que conecta psicólogos, clínicas e pacientes, oferecendo:

- **Para Clínicas**: Gestão de psicólogos, visualização de agenda e estatísticas gerais
- **Para Psicólogos**: Gerenciamento de pacientes, documentos, relatórios e agenda
- **Para Pacientes**: Chat com IA como diário pessoal, agendamento de consultas, recursos de emergência

## Tecnologias Utilizadas

- **React Native** com **Expo** para desenvolvimento multiplataforma
- **TypeScript** para tipagem estática
- **React Navigation** para navegação entre telas
- **Context API** para gerenciamento de estado
- **Expo Vector Icons** para ícones

## Estrutura do Projeto

```
health-mind-app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Card.tsx
│   │   └── Header.tsx
│   ├── contexts/            # Contextos React
│   │   └── AuthContext.tsx
│   ├── navigation/          # Navegação do app
│   │   ├── AppNavigator.tsx
│   │   ├── ClinicNavigator.tsx
│   │   ├── PsychologistNavigator.tsx
│   │   └── ClientNavigator.tsx
│   ├── screens/             # Telas do aplicativo
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx
│   │   ├── clinic/
│   │   │   ├── OverviewScreen.tsx
│   │   │   ├── PsychologistsScreen.tsx
│   │   │   └── ScheduleScreen.tsx
│   │   ├── psychologist/
│   │   │   ├── ClientsScreen.tsx
│   │   │   ├── DocumentsScreen.tsx
│   │   │   ├── PsychScheduleScreen.tsx
│   │   │   └── ReportsScreen.tsx
│   │   └── client/
│   │       ├── ChatScreen.tsx
│   │       ├── AppointmentsScreen.tsx
│   │       ├── EmergencyScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts
│   └── utils/               # Utilitários (para uso futuro)
├── App.tsx                  # Ponto de entrada do app
└── package.json
```

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI (instalado globalmente ou via npx)

### Passos para rodar o projeto

1. Navegue até a pasta do projeto:
```bash
cd health-mind-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Execute o app em uma plataforma:

- **Android**: Pressione `a` no terminal ou execute `npm run android`
- **iOS**: Pressione `i` no terminal ou execute `npm run ios` (requer macOS)
- **Web**: Pressione `w` no terminal ou execute `npm run web`

Você também pode escanear o QR Code com o app Expo Go no seu smartphone.

## Como Usar

### Login

O aplicativo possui 3 tipos de acesso:

1. **Cliente** - Para pacientes que buscam acompanhamento
2. **Psicólogo** - Para profissionais de psicologia
3. **Clínica** - Para administração de clínicas

O login é simulado nesta versão. Basta selecionar o tipo de acesso, digitar qualquer email e senha para entrar.

### Funcionalidades por Tipo de Usuário

#### Cliente
- **Diário (Chat)**: Conversa com IA treinada para atuar como suporte emocional
- **Consultas**: Visualização e agendamento de consultas
- **Emergência**: Acesso rápido a recursos de ajuda imediata
- **Perfil**: Configurações e informações pessoais

#### Psicólogo
- **Pacientes**: Lista e gerenciamento de pacientes
- **Agenda**: Visualização de compromissos (em desenvolvimento)
- **Documentos**: Anamneses, relatórios de sessão e avaliações
- **Relatórios**: Análise de chats dos pacientes

#### Clínica
- **Visão Geral**: Dashboard com estatísticas da clínica
- **Psicólogos**: Gerenciamento dos profissionais da clínica
- **Agenda**: Visualização da agenda geral da clínica

## Estado Atual do Projeto

Este é um **protótipo/casca** do aplicativo. As seguintes funcionalidades estão implementadas:

- Navegação completa entre telas
- Interface de usuário para todas as visões
- Autenticação simulada
- Dados de exemplo (mock data)

### Próximos Passos (Implementação Futura)

- Integração com backend e banco de dados
- Implementação real do agente de IA para o chat
- Sistema de autenticação real com JWT
- Sistema de notificações push
- Upload de documentos e imagens
- Sistema de pagamentos
- Chamadas de vídeo para sessões remotas
- Relatórios com gráficos e análises

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador

## Observações

- Este projeto está em fase inicial de desenvolvimento
- A integração com IA e backend será implementada futuramente
- Os dados apresentados são simulados para demonstração da interface

## Licença

Este projeto é privado e está em desenvolvimento.
