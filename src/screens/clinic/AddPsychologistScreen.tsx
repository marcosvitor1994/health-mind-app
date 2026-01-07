import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gerarSystemPrompt, PsychologistFormData } from '../../utils/systemPromptGenerator';
import { Ionicons } from '@expo/vector-icons';

const ABORDAGENS = [
  'Gestalt',
  'TCC (Terapia Cognitivo-Comportamental)',
  'Psicanálise',
  'Humanista',
  'Sistêmica',
  'Comportamental',
  'Junguiana',
  'Existencial',
  'Outra',
];

const PUBLICOS = [
  'LGBTQIA+',
  'Crianças',
  'Adolescentes',
  'Adultos',
  'Idosos',
  'Casais',
  'Famílias',
  'Gestantes',
];

const TEMAS = [
  'Ansiedade',
  'Depressão',
  'Trauma',
  'Luto',
  'Relacionamentos',
  'Violência',
  'Autoestima',
  'Estresse',
  'Burnout',
  'Vícios',
  'Transtornos Alimentares',
  'TOC',
];

const TONS = [
  'Acolhedor',
  'Direto',
  'Reflexivo',
  'Encorajador',
  'Formal',
  'Descontraído',
];

export default function AddPsychologistScreen({ navigation }: any) {
  // Dados Básicos
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [crp, setCrp] = useState('');
  const [formacaoAcademica, setFormacaoAcademica] = useState('');

  // Abordagem Terapêutica
  const [abordagemPrincipal, setAbordagemPrincipal] = useState('');
  const [descricaoTrabalho, setDescricaoTrabalho] = useState('');

  // Especializações
  const [publicosEspecificos, setPublicosEspecificos] = useState<string[]>([]);
  const [temasEspecializados, setTemasEspecializados] = useState<string[]>([]);

  // Tom e Estilo
  const [tonsComunicacao, setTonsComunicacao] = useState<string[]>([]);

  // Técnicas Favoritas
  const [tecnicasFavoritas, setTecnicasFavoritas] = useState('');

  // Limites e Protocolo
  const [restricoesTematicas, setRestricoesTematicas] = useState('');

  // Diferenciais
  const [diferenciais, setDiferenciais] = useState('');

  // Dropdown states
  const [showAbordagemDropdown, setShowAbordagemDropdown] = useState(false);

  const toggleItem = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };


  const handleSubmit = () => {
    // Validação
    if (!nomeCompleto || !email || !telefone || !crp || !formacaoAcademica) {
      Alert.alert('Erro', 'Por favor, preencha todos os dados básicos.');
      return;
    }

    if (!abordagemPrincipal || !descricaoTrabalho) {
      Alert.alert('Erro', 'Por favor, preencha a abordagem terapêutica.');
      return;
    }

    if (tonsComunicacao.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione pelo menos um tom de comunicação.');
      return;
    }

    // Preparar dados do formulário
    const formData: PsychologistFormData = {
      nomeCompleto,
      crp,
      formacaoAcademica,
      abordagemPrincipal,
      descricaoTrabalho,
      publicosEspecificos,
      temasEspecializados,
      tonsComunicacao,
      tecnicasFavoritas: tecnicasFavoritas.split('\n').filter(t => t.trim()),
      restricoesTematicas,
      diferenciais,
    };

    // Gerar o system prompt personalizado
    const systemPrompt = gerarSystemPrompt(formData);

    // Aqui você faria a chamada para a API
    const psychologistData = {
      ...formData,
      email,
      telefone,
      systemPrompt, // ← System prompt gerado automaticamente
    };

    console.log('=== DADOS DO PSICÓLOGO ===');
    console.log(JSON.stringify(psychologistData, null, 2));
    console.log('\n=== SYSTEM PROMPT GERADO ===');
    console.log(systemPrompt);

    Alert.alert(
      'Sucesso',
      'Psicólogo cadastrado com sucesso!\n\nO system prompt foi gerado e está pronto para ser enviado à API.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Psicólogo</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* DADOS BÁSICOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Dados Básicos *</Text>

          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome completo"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            style={styles.input}
            placeholder="(00) 00000-0000"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>CRP (Conselho Regional de Psicologia) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: CRP 06/123456"
            value={crp}
            onChangeText={setCrp}
          />

          <Text style={styles.label}>Formação Acadêmica (Instituição) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Universidade de São Paulo"
            value={formacaoAcademica}
            onChangeText={setFormacaoAcademica}
          />
        </View>

        {/* ABORDAGEM TERAPÊUTICA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Abordagem Terapêutica *</Text>

          <Text style={styles.label}>Abordagem Principal *</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowAbordagemDropdown(!showAbordagemDropdown)}
          >
            <Text style={abordagemPrincipal ? styles.dropdownText : styles.dropdownPlaceholder}>
              {abordagemPrincipal || 'Selecione a abordagem'}
            </Text>
            <Ionicons
              name={showAbordagemDropdown ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {showAbordagemDropdown && (
            <View style={styles.dropdownList}>
              {ABORDAGENS.map((abordagem) => (
                <TouchableOpacity
                  key={abordagem}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setAbordagemPrincipal(abordagem);
                    setShowAbordagemDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{abordagem}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Breve descrição da sua forma de trabalhar *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Máximo 200 caracteres"
            value={descricaoTrabalho}
            onChangeText={setDescricaoTrabalho}
            multiline
            maxLength={200}
          />
          <Text style={styles.charCounter}>{descricaoTrabalho.length}/200</Text>
        </View>

        {/* ESPECIALIZAÇÕES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Especializações</Text>

          <Text style={styles.label}>Públicos Específicos</Text>
          <View style={styles.checkboxGroup}>
            {PUBLICOS.map((publico) => (
              <TouchableOpacity
                key={publico}
                style={[
                  styles.checkbox,
                  publicosEspecificos.includes(publico) && styles.checkboxSelected,
                ]}
                onPress={() => toggleItem(publico, publicosEspecificos, setPublicosEspecificos)}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    publicosEspecificos.includes(publico) && styles.checkboxTextSelected,
                  ]}
                >
                  {publico}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Temas Especializados</Text>
          <View style={styles.checkboxGroup}>
            {TEMAS.map((tema) => (
              <TouchableOpacity
                key={tema}
                style={[
                  styles.checkbox,
                  temasEspecializados.includes(tema) && styles.checkboxSelected,
                ]}
                onPress={() => toggleItem(tema, temasEspecializados, setTemasEspecializados)}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    temasEspecializados.includes(tema) && styles.checkboxTextSelected,
                  ]}
                >
                  {tema}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TOM E ESTILO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Tom e Estilo *</Text>
          <Text style={styles.label}>Como você se comunica? *</Text>

          <View style={styles.checkboxGroup}>
            {TONS.map((tom) => (
              <TouchableOpacity
                key={tom}
                style={[
                  styles.checkbox,
                  tonsComunicacao.includes(tom) && styles.checkboxSelected,
                ]}
                onPress={() => toggleItem(tom, tonsComunicacao, setTonsComunicacao)}
              >
                <Text
                  style={[
                    styles.checkboxText,
                    tonsComunicacao.includes(tom) && styles.checkboxTextSelected,
                  ]}
                >
                  {tom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TÉCNICAS FAVORITAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Técnicas Favoritas (Opcional)</Text>
          <Text style={styles.label}>
            Liste 3-5 técnicas/perguntas que você mais usa nas sessões
          </Text>
          <Text style={styles.hint}>Uma por linha</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={'Ex:\n"O que você está sentindo agora?"\n"Como isso reverbera no seu corpo?"'}
            value={tecnicasFavoritas}
            onChangeText={setTecnicasFavoritas}
            multiline
            numberOfLines={5}
          />
        </View>

        {/* LIMITES E PROTOCOLO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Limites e Protocolo *</Text>
          <Text style={styles.hint}>
            (CVV - 188 já vem como padrão para encaminhamento de emergências)
          </Text>

          <Text style={styles.label}>Alguma restrição específica de tema?</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva se há algum tema que você prefere não atender"
            value={restricoesTematicas}
            onChangeText={setRestricoesTematicas}
            multiline
          />
        </View>

        {/* DIFERENCIAIS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Diferenciais (Opcional)</Text>
          <Text style={styles.label}>
            O que seus pacientes mais valorizam no seu atendimento?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Máximo 100 caracteres"
            value={diferenciais}
            onChangeText={setDiferenciais}
            maxLength={100}
          />
          <Text style={styles.charCounter}>{diferenciais.length}/100</Text>
        </View>

        {/* BOTÃO ENVIAR */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Cadastrar Psicólogo</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginTop: 8,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCounter: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#999',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#333',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  checkbox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  checkboxTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
