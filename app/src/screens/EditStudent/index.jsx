import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from '@gluestack-ui/themed';

const EditStudentScreen = ({ route, navigation }) => {
  // Obtém o aluno passado como parâmetro na navegação
  const { student } = route.params;

  // Estados para armazenar os dados do aluno
  const [nome, setNome] = useState(student.nome);
  const [rm, setRm] = useState(student.rm.toString());
  const [email, setEmail] = useState(student.email || '');
  const [idade, setIdade] = useState(student.idade ? student.idade.toString() : '');
  const [loading, setLoading] = useState(false);

  // Função para validar o formulário
  const validateForm = () => {
    // Validações básicas
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome do aluno é obrigatório');
      return false;
    }

    if (!rm.trim()) {
      Alert.alert('Erro', 'O RM é obrigatório');
      return false;
    }

    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return false;
    }

    if (idade.trim() && (isNaN(Number(idade)) || Number(idade) < 0)) {
      Alert.alert('Erro', 'Idade inválida');
      return false;
    }

    return true;
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    // Validar formulário
    if (!validateForm()) {
      return;
    }

    // Iniciar estado de carregamento
    setLoading(true);

    try {
      // Preparar dados para envio
      const updatedStudent = {
        id: student.id,
        nome: nome.trim(),
        rm: rm.trim(),
        email: email.trim() || null,
        idade: idade.trim() ? Number(idade) : null
      };

      // Chamada à API para atualizar o aluno
      const response = await axios.put(`http://10.0.2.2:8085/api/updateStudent/${student.rm}`, updatedStudent);

      // Exibir mensagem de sucesso
      Alert.alert(
        'Sucesso', 
        'Aluno atualizado com sucesso!',
        [{ 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }]
      );
    } catch (error) {
      // Tratamento de erro
      console.error('Erro ao atualizar aluno:', error);
      Alert.alert(
        'Erro', 
        'Não foi possível atualizar o aluno. Tente novamente.'
      );
    } finally {
      // Finalizar estado de carregamento
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Editar Aluno</Text>

        {/* Campo Nome */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome do aluno"
            placeholderTextColor="#888"
          />
        </View>

        {/* Campo RM */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>RM (Registro do Aluno)</Text>
          <TextInput
            style={styles.input}
            value={rm}
            onChangeText={setRm}
            placeholder="Digite o RM"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        </View>

        {/* Campo Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email (Opcional)</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite o email do aluno"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Campo Idade */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Idade (Opcional)</Text>
          <TextInput
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
            placeholder="Digite a idade do aluno"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        </View>

        {/* Botão de Salvar */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  inputContainer: {
    marginBottom: 15
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default EditStudentScreen;