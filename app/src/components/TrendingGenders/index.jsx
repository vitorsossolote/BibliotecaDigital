import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const TrendingGenders = () => {
  const [genres, setGenres] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Fetch genres and sort by ID
        const response = await axios.get("http://10.0.2.2:8085/api/generos");
        
        // Sort genres by ID and take the first 5
        const sortedGenres = response.data
          .sort((a, b) => a.id_genero - b.id_genero)
          .slice(0, 5);
        
        setGenres(sortedGenres);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGenres();
  }, []);

  // Color styles for different genres
  const genreStyles = {
    suspense: { color: '#2c3e50', textShadowColor: 'rgba(44, 62, 80, 0.5)' },
    fantasia: { color: '#6c3483', textShadowColor: 'rgba(108, 52, 131, 0.5)', fontStyle: 'italic' },
    terror: { color: '#600', textShadowColor: 'rgba(102, 0, 0, 0.5)', letterSpacing: 5 },
    conto: { color: '#27ae60', textShadowColor: 'rgba(39, 174, 96, 0.5)', fontStyle: 'italic' },
    cronica: { color: '#d35400', textShadowColor: 'rgba(211, 84, 0, 0.5)', fontStyle: 'italic' }
  };

  // Default color for genres not in predefined list
  const defaultStyle = { color: '#34495e', textShadowColor: 'rgba(52, 73, 94, 0.5)' };

  const handleGenrePress = (genre) => {
    // Navigate to SearchGenderScreen with the selected genre
    navigation.navigate('SearchGenderScreen', { 
      initialSelectedGenre: genre 
    });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {genres.map((genre, index) => {
        // Try to match genre name or use default style
        const styleKey = genre.nome_genero.toLowerCase();
        const genreStyle = genreStyles[styleKey] || defaultStyle;

        return (
          <Pressable 
            key={genre.id_genero} 
            style={styles.genreWrapper} 
            onPress={() => handleGenrePress(genre)}
          >
            <Text 
              style={[
                styles.baseTitle, 
                { 
                  color: genreStyle.color, 
                  textShadowColor: genreStyle.textShadowColor,
                  ...(genreStyle.fontStyle && { fontStyle: genreStyle.fontStyle }),
                  ...(genreStyle.letterSpacing && { letterSpacing: genreStyle.letterSpacing })
                }
              ]}
            >
              {genre.nome_genero}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 6,
    alignItems: 'center',
    bottom: 10
  },
  genreWrapper: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row"
  },
  baseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});

export default TrendingGenders;