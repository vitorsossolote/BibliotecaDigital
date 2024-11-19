import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData() {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('userData');
            setAuthData({
                user: JSON.parse(storedUser)
            });
        } catch (error) {
        console.error('Error loading storage data:', error);
    } finally {
        setLoading(false);
    }
}

const signIn = async (token, userData) => {
    try {
        // Validação dos dados recebidos
        if (!token || !userData) {
            throw new Error('Token e dados do usuário são obrigatórios');
        }

        // Garantir que temos os dados essenciais do usuário
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
    } catch (error) {
        console.error('Error storing auth data:', error);
        throw error;
    }
};

const signOut = async () => {
    try {
        await AsyncStorage.multiRemove(['token', 'userData']);

        await AsyncStorage.multiRemove(['token', 'userData',]);
        setAuthData(null);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

const updateUserData = async (newUserData) => {
    try {
        if (!authData) {
            throw new Error('Usuário não está autenticado');
        }

        const updatedUserData = {
            ...authData.user,
            ...newUserData,
            updatedAt: new Date().toISOString()
        };

        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

        setAuthData({
            ...authData,
            user: updatedUserData
        });
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};
// Add to favorites
const addToFavorites = async (book) => {
    const updatedFavorites = [...favorites, book];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

// Remove from favorites
const removeFromFavorites = async (bookId) => {
    const updatedFavorites = favorites.filter(book => book.id !== bookId);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

// Check if book is in favorites
const checkFavoriteStatus = (bookId) => {
    return favorites.some(book => book.id === bookId);
};

// Load user and favorites on app start
useEffect(() => {
    const loadStoredData = async () => {
        const storedUser = await AsyncStorage.getItem('authData');
        const storedFavorites = await AsyncStorage.getItem('favorites');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    };

    loadStoredData();
}, []);

// Função para verificar se o token ainda é válido
const isAuthenticated = () => {
    return !!authData?.token;
};

return (
    <AuthContext.Provider
        value={{
            authData,
            loading,
            signIn,
            signOut,
            updateUserData,
            isAuthenticated,
            favorites,
            addToFavorites,
            removeFromFavorites,
            checkFavoriteStatus,
            // Helpers para acessar dados comuns
            user: authData?.user || null,
            token: authData?.token || null,
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