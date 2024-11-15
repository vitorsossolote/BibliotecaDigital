import React from 'react';
import { StyleSheet, Text, ScrollView, View, Pressable,} from 'react-native';

const TrendingGenders = () => {
  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Suspense */}
      <Pressable style={styles.genreWrapper} onPress={() => console.log("Apertou no genero")}>
        <Text style={[styles.baseTitle, styles.suspenseTitle]}>Suspense</Text>
        
      </Pressable>
      <Pressable style={styles.genreWrapper} onPress={() => console.log("Apertou no genero")}>
        <Text style={[styles.baseTitle, styles.dramaTitle]}>Drama</Text>
       
      </Pressable>
      <Pressable style={styles.genreWrapper} onPress={() => console.log("Apertou no genero")}>
        <Text style={[styles.baseTitle, styles.terrorTitle]}>Terror</Text>
        
      </Pressable>
      <Pressable style={styles.genreWrapper} onPress={() => console.log("Apertou no genero")}>
        <Text style={[styles.baseTitle, styles.contoTitle]}>Conto</Text>
        
      </Pressable>
      <Pressable style={styles.genreWrapper} onPress={() => console.log("Apertou no genero")}>
        <Text style={[styles.baseTitle, styles.cronicaTitle]}>Crônica</Text>
        
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 6,
    alignItems: 'center',
    bottom:10
  },
  genreWrapper: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row"
  },
  baseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  decorativeLine: {
    fontSize: 22,
    marginLeft:6,
    top:1,
  },

  // Suspense
  suspenseTitle: {
    color: '#2c3e50',
    letterSpacing: 3,
    textShadowColor: 'rgba(44, 62, 80, 0.5)',
  },
  suspenseSubtitle: {
    color: '#95a5a6',
  },

  // Drama
  dramaTitle: {
    color: '#6c3483',
    fontStyle: 'italic',
    textShadowColor: 'rgba(108, 52, 131, 0.5)',
  },
  dramaSubtitle: {
    color: '#8e44ad',
  },

  // Terror
  terrorTitle: {
    color: '#600',
    letterSpacing: 5,
    textShadowColor: 'rgba(102, 0, 0, 0.5)',
    fontFamily: 'normal',
  },
  terrorSubtitle: {
    color: '#800',
  },

  // Conto
  contoTitle: {
    color: '#27ae60',
    fontStyle: 'italic',
    textShadowColor: 'rgba(39, 174, 96, 0.5)',
  },
  contoSubtitle: {
    color: '#2ecc71',
  },

  // Crônica
  cronicaTitle: {
    color: '#d35400',
    fontStyle: 'italic',
    textShadowColor: 'rgba(211, 84, 0, 0.5)',
  },
  cronicaSubtitle: {
    color: '#e67e22',
  },
});

export default TrendingGenders;