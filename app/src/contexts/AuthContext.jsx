import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [authLibrarianData, setAuthLibrarianData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        Promise.all([
            loadStorageData(),
            loadLibrarianStorageData(),
            loadFavorites()
        ]).finally(() => {
            setLoading(false);
        });
    }, []);

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
            await AsyncStorage.multiRemove(['token', 'userData','librarianToken', 'librarianData']);
            setAuthData(null);
            setAuthLibrarianData(null);
            setFavorites([]);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };
    
    // Add to favorites
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

    // Remove from favorites
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

    // Check if book is in favorites
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