// Tipos de usuário
export type UserRole = 'clinic' | 'psychologist' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Tipos para Clínica
export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  logo?: string;
}

export interface Psychologist {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  crp: string;
  avatar?: string;
  clinicId: string;
}

// Tipos para Paciente/Cliente
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  psychologistId: string;
  avatar?: string;
  registrationDate: Date;
}

// Tipos para Agenda
export interface Appointment {
  id: string;
  clientId: string;
  psychologistId: string;
  date: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// Tipos para Documentos
export interface Document {
  id: string;
  clientId: string;
  psychologistId: string;
  type: 'anamnesis' | 'session_report' | 'evaluation' | 'other';
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para Chat
export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
  isAI?: boolean;
}

export interface ChatSession {
  id: string;
  clientId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de Navegação
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type ClinicTabParamList = {
  Overview: undefined;
  Psychologists: undefined;
  Schedule: undefined;
};

export type PsychologistTabParamList = {
  Clients: undefined;
  Schedule: undefined;
  Documents: undefined;
  Reports: undefined;
};

export type ClientTabParamList = {
  Chat: undefined;
  Appointments: undefined;
  Emergency: undefined;
  Profile: undefined;
};
