import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext({});
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://10.0.2.2:8085/api',
    timeout: 10000,
});


export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [authLibrarianData, setAuthLibrarianData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [livros, setLivros] = useState([]);
    const [autor, setAutor] = useState([]);
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedLoanBooks, setSelectedLoanBooks] = useState([]);

    useEffect(() => {
        Promise.all([
            loadStorageData(),
            loadLibrarianStorageData(),
            loadFavorites(),
            buscarLivros(),
            buscarAutor(),
        ]).finally(() => {
            setLoading(false);
        });
    }, []);

    const selectBookForLoan = (book) => {
        // Verificar se o livro já está na lista
        if (selectedLoanBooks.some(selectedBook => selectedBook.id === book.id)) {
            return false; // Livro já selecionado
        }

        // Verificar se já tem 2 livros
        if (selectedLoanBooks.length < 2) {
            setSelectedLoanBooks([...selectedLoanBooks, book]);
            return true;
        } else {
            // Limite de 2 livros atingido
            return false;
        }
    };
    const clearSelectedLoanBooks = () => {
        setSelectedLoanBooks([]);
    };

    const removeSelectedLoanBook = (bookId) => {
        setSelectedLoanBooks(selectedLoanBooks.filter(book => book.id !== bookId));
    };


    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://10.0.2.2:8085/api/listAllStudents');
            setStudents(response.data);
            setError(null);
        } catch (err) {
            console.error('Erro ao buscar alunos:', err);
            setError('Não foi possível carregar os alunos');
        } finally {
            setLoading(false);
        }
    };

    // Select a user for editing
    const selectUserForEdit = (user) => {
        setSelectedUser(user);
    };

    // Update student
    const updateStudent = async (studentData) => {
        try {
            await axios.put(`http://10.0.2.2:8085/api/updateStudent/${studentData.rm}`, studentData);
            // Update local state
            setStudents(students.map(student =>
                student.rm === studentData.rm ? { ...student, ...studentData } : student
            ));
        } catch (err) {
            console.error('Erro ao atualizar aluno:', err);
            setError('Não foi possível atualizar o aluno');
        }
    };

    // Delete student
    const deleteStudent = async (rm) => {
        try {
            await axios.delete(`http://10.0.2.2:8085/api/deleteStudent/${rm}`);
            setStudents(students.filter(student => student.rm !== rm));
        } catch (err) {
            console.error('Erro ao excluir aluno:', err);
            setError('Não foi possível excluir o aluno');
        }
    };

    // Fetch students on initial load
    useEffect(() => {
        fetchStudents();
    }, []);

    const buscarLivros = async () => {
        setLoading(true);
        try {
            const response = await api.get('/listBooks');
            console.log('Resposta da API:', response.data); // Debug
            setLivros(response.data);
            setError(null);
        } catch (err) {
            console.error('Erro completo:', err); // Debug
            setError(
                err.response?.data?.msg ||
                err.message ||
                'Erro ao buscar livros'
            );
        } finally {
            setLoading(false);
        }
    };
    const buscarAutor = async () => {
        setLoading(true);
        try {
            const response = await api.get('/autores');
            console.log('Resposta da API:', response.data); // Debug
            setAutor(response.data);
            setError(null);
        } catch (err) {
            console.error('Erro completo:', err); // Debug
            setError(
                err.response?.data?.msg ||
                err.message ||
                'Erro ao buscar autores'
            );
        } finally {
            setLoading(false);
        }
    };
    const buscarLivroPorId = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8085/api/listBooks/${id}`);
            setLivroSelecionado(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.msg || 'Erro ao buscar livro');
        } finally {
            setLoading(false);
        }
    };
    const searchLivros = async (searchTerm) => {
        setLoading(true);
        try {
            if (!searchTerm.trim()) {
                await buscarLivros();
                return;
            }

            const response = await api.get(`/searchLivros/${searchTerm}`);
            console.log('Resultado da busca:', response.data);

            if (response.data && Array.isArray(response.data)) {
                setLivros(response.data);
                setError(null);
            } else {
                setLivros([]);
                setError('Formato de resposta inválido');
            }
        } catch (err) {
            console.error('Erro na busca:', err);
            setError(
                err.response?.data?.msg ||
                err.message ||
                'Erro ao buscar livros'
            );
            setLivros([]);
        } finally {
            setLoading(false);
        }
    };



    const loadFavorites = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                const userFavorites = await AsyncStorage.getItem(`favorites_${user.id}`);
                if (userFavorites) {
                    setFavorites(JSON.parse(userFavorites));
                }
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    async function loadStorageData() {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('userData');

            if (storedToken && storedUser) {
                setAuthData({
                    token: storedToken,
                    user: JSON.parse(storedUser)
                });
                await loadFavorites();
            }
        } catch (error) {
            console.error('Error loading storage data:', error);
        }
    }

    async function loadLibrarianStorageData() {
        try {
            const storedToken = await AsyncStorage.getItem('librarianToken');
            const storedLibrarian = await AsyncStorage.getItem('librarianData');

            if (storedToken && storedLibrarian) {
                setAuthLibrarianData({
                    librarianToken: storedToken,
                    librarian: JSON.parse(storedLibrarian)
                });
            }
        } catch (error) {
            console.error('Error loading librarian storage data:', error);
        }
    }

    const signInLibrarian = async (librarianToken, librarian) => {
        try {
            if (!librarianToken || !librarian) {
                throw new Error('Token e dados do bibliotecário são obrigatórios');
            }

            const librarianData = {
                ...librarian,
                lastLogin: new Date().toISOString()
            };

            await AsyncStorage.setItem('librarianToken', librarianToken);
            await AsyncStorage.setItem('librarianData', JSON.stringify(librarianData));

            setAuthLibrarianData({
                librarianToken,
                librarian: librarianData
            });
        } catch (error) {
            console.error('Erro ao armazenar dados de bibliotecário:', error);
            throw error;
        }
    };

    const signOutLibrarian = async () => {
        try {
            await AsyncStorage.multiRemove(['librarianToken', 'librarianData']);
            setAuthLibrarianData(null);
        } catch (error) {
            console.error('Error signing out librarian:', error);
            throw error;
        }
    };

    const signIn = async (token, userData) => {
        try {
            if (!token || !userData) {
                throw new Error('Token e dados do usuário são obrigatórios');
            }

            const essentialUserData = {
                ...userData,
                lastLogin: new Date().toISOString(),
            };

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userData', JSON.stringify(essentialUserData));

            setAuthData({
                token,
                user: essentialUserData
            });

            // Carrega os favoritos do usuário após o login
            await loadFavorites();
        } catch (error) {
            console.error('Error storing auth data:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.multiRemove(['token', 'userData', 'librarianToken', 'librarianData']);
            setAuthData(null);
            setAuthLibrarianData(null);
            setFavorites([]);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    // Adicionar aos favoritos
    const addToFavorites = async (book) => {
        try {
            if (!authData?.user?.id) {
                throw new Error('Usuário não está autenticado');
            }

            const updatedFavorites = [...favorites, book];
            setFavorites(updatedFavorites);

            // Salva os favoritos com o ID do usuário
            await AsyncStorage.setItem(
                `favorites_${authData.user.id}`,
                JSON.stringify(updatedFavorites)
            );
        } catch (error) {
            console.error('Error adding to favorites:', error);
            throw error;
        }
    };

    // Remover dos favoritos
    const removeFromFavorites = async (bookId) => {
        try {
            if (!authData?.user?.id) {
                throw new Error('Usuário não está autenticado');
            }

            const updatedFavorites = favorites.filter(book => book.id !== bookId);
            setFavorites(updatedFavorites);

            // Atualiza os favoritos no AsyncStorage
            await AsyncStorage.setItem(
                `favorites_${authData.user.id}`,
                JSON.stringify(updatedFavorites)
            );
        } catch (error) {
            console.error('Error removing from favorites:', error);
            throw error;
        }
    };

    // Checar se o livros está nos favoritos
    const checkFavoriteStatus = (bookId) => {
        return favorites.some(book => book.id === bookId);
    };


    const isAuthenticated = () => {
        return !!authData?.token;
    };

    const isLibrarianAuthenticated = () => {
        return !!authLibrarianData?.librarianToken;
    };

    return (
        <AuthContext.Provider
            value={{
                authData,
                authLibrarianData,
                loading,
                signIn,
                signOut,
                signInLibrarian,
                signOutLibrarian,
                isAuthenticated,
                isLibrarianAuthenticated,
                favorites,
                addToFavorites,
                removeFromFavorites,
                checkFavoriteStatus,
                livros,
                livroSelecionado,
                students,
                selectedUser,
                fetchStudents,
                selectUserForEdit,
                updateStudent,
                deleteStudent,
                // loading,
                error,
                searchLivros,
                buscarLivros,
                buscarLivroPorId,
                buscarAutor,
                autor,
                selectedLoanBooks,
                selectBookForLoan,
                clearSelectedLoanBooks,
                removeSelectedLoanBook,
                // acessar dados de cada usuário
                user: authData?.user || null,
                token: authData?.token || null,
                librarian: authLibrarianData?.librarian || null,
                librarianToken: authLibrarianData?.librarianToken || null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};