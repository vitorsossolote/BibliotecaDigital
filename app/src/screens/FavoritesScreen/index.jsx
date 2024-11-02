//Tela de Favoritos
//Bibliotecas Utilizadas
import React from "react"
import { Center, View, Text} from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { StyleSheet } from "react-native"

//Componentes utilizados

//Imagens Utilizadas


//Inicio do código
const FavoritesScreen = () => (
  <GluestackUIProvider config={config}>
    <View>
        <Center>
            <Text>Favorites</Text>
        </Center>
    </View>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container:{
        
    }
});

export default FavoritesScreen


