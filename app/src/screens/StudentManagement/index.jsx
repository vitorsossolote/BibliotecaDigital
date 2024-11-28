import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Componente para Item da Lista de Alunos
const StudentItem = ({ student, onEdit, onDelete }) => {
  return (
    <View style={styles.studentItem}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{student.nome}</Text>
        <Text style={styles.studentRM}>RM: {student.rm}</Text>
      </View>
      <View style={styles.studentActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={() => onEdit(student)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => onDelete(student)}
        >
          <Text style={styles.actionButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Tela Principal de Gerenciamento de Alunos
const StudentManagementScreen = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Função para buscar alunos da API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://10.0.2.2:8085/api/listAllStudents');
      setStudents(response.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar alunos:', err);
      setError('Não foi possível carregar os alunos');
      Alert.alert('Erro', 'Não foi possível carregar os alunos');
    } finally {
      setLoading(false);
    }
  };

  // Carregar alunos quando a tela for renderizada
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditStudent = (student) => {
    navigation.navigate('EditStudent', { student });
  };

  const handleDeleteStudent = (student) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o aluno ${student.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              // Adicione aqui a chamada à API para excluir o aluno
              await axios.delete(`http://10.0.2.2:8085/api/deleteStudent/${student.rm}`);
              setStudents(students.filter(s => s.id !== student.id));
            } catch (err) {
              console.error('Erro ao excluir aluno:', err);
              Alert.alert('Erro', 'Não foi possível excluir o aluno');
            }
          }
        }
      ]
    );
  };

  // Renderização condicional de carregamento
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando alunos...</Text>
      </View>
    );
  }

  // Renderização condicional de erro
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchStudents} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Alunos</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StudentItem 
            student={item} 
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum aluno encontrado</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchStudents}
          />
        }
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateStudent')}
      >
        <Text style={styles.addButtonText}>+ Adicionar Aluno</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  studentInfo: {
    flex: 1,
    marginRight: 16
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  studentRM: {
    fontSize: 14,
    color: '#666'
  },
  studentActions: {
    flexDirection: 'row'
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8
  },
  editButton: {
    backgroundColor: '#4CAF50'
  },
  deleteButton: {
    backgroundColor: '#F44336'
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  editContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  editTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center'
  },
  retryButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  emptyText: {
    fontSize: 18,
    color: '#888'
  }
});

export default StudentManagementScreen;