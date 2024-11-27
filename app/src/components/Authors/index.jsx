import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Pressable, Image,View} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const TrendingAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // Fetch authors and sort by ID
        const response = await axios.get("http://10.0.2.2:8085/api/autores");

        // Sort authors by ID and take the first 5
        const sortedAuthors = response.data
          .sort((a, b) => a.id_autor - b.id_autor)
          .slice(0, 5);

        setAuthors(sortedAuthors);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      }
    };

    fetchAuthors();
  }, []);

 
  // Estilo padrão para autores não definidos
  const defaultStyle = { 
    color: '#34495e', 
    textShadowColor: 'rgba(52, 73, 94, 0.5)' 
  };

  const handleAuthorPress = (author) => {
    // Navigate to the author details screen and pass the author data
    navigation.navigate('AuthorsScreen', { author: author });
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.authorWrapper}>
        {authors.map((author, index) => {
          // Tentar combinar o nome do autor ou usar estilo padrão
          const styleKey = author.nome_autor.toLowerCase();

          return (
            <Pressable 
              key={index} 
              onPress={() => handleAuthorPress(author)}
            >
              <View style={styles.authorContainer}>
                <Image 
                  source={{ uri: author.image }} 
                  style={styles.image} 
                  resizeMode="cover"
                />
                <Text 
                  style={[
                    styles.baseTitle, 
                    { textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }
                  ]}
                >
                  {author.nome_autor}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 6,
    alignItems: 'center',
    bottom: 10
  },
  authorWrapper: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    gap: 20
  },
  authorContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 102,
    height: 102,
    borderRadius: 51, // Torna a imagem circular
    marginBottom: 5
  },
  baseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  }
});

export default TrendingAuthors;