import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
    Button,
    ButtonText,
    Image,
    Pressable
} from "@gluestack-ui/themed"
import { SafeAreaView } from 'moti';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from "../../contexts/AuthContext";

const { width: screenWidth } = Dimensions.get('window');

type Props = {
    onPress: (livro: any) => void; 
}

export default function Reservar({ onPress }: Props) {
    const { fetchUserLoans, user } = useAuth();
    const [lastLoan, setLastLoan] = useState(null);

    useEffect(() => {
        const loadLastLoan = async () => {
            if (user?.rm) {
                const loans = await fetchUserLoans();
                if (loans && loans.length > 0) {
                    // Get the most recent loan (first in the array due to DESC order in SQL)
                    setLastLoan(loans[0]);
                }
            }
        };

        loadLastLoan();
    }, [user]);

    const RenderItem = ({item}) => {
        if (!item) return null;

        return (
            <View style={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Reservar Novamente?</Text>
                    <Button 
                        style={styles.Button}
                        size="md"
                        variant="solid"
                        action="primary"
                        onPress={() => onPress(item)}
                    >
                        <ButtonText>Reservar Agora</ButtonText>
                    </Button>
                </View>
                <View style={styles.imageContainer}>
                    <Pressable onPress={() => onPress(item)}>
                        <Image 
                            style={styles.Image} 
                            source={{ uri: item.image }} 
                            alt={item.titulo} 
                        />
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <FlatList
                data={lastLoan ? [lastLoan] : []} 
                renderItem={RenderItem}
                keyExtractor={(item) => item.emprestimo_id.toString()}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            Você ainda não realizou nenhum empréstimo
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    card: {
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 160,
        flexDirection: 'row',
        backgroundColor: "#f3f3f3",
        borderRadius: 20,
        marginBottom: 15,
        right: 8,
        
    },
    textContainer: {
        width: 240,
        marginLeft: 20,
        padding: 15,
        paddingLeft: 23,
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700'
    },
    rating: {
        fontSize: 20,
        color: 'black',
    },
    Button: {
        backgroundColor: "#EE2D32",
        borderRadius: 25,
        marginTop: 20,
        width: 170,
    },
    imageContainer: {
        height: "100%",
        width: 145,
        right:10,
    },
    Image: {
        width: 110,
        height: 160,
        borderRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        color: 'black',
        marginTop: 10,
        fontWeight: '600'
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
});