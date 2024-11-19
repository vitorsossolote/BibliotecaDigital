// Profile

//Bibliotecas Utilizadas
import React, { useRef, useMemo } from "react"
import { Center, View, Text, Image, Button, ButtonText } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, Pressable, Alert } from "react-native"
import { ChevronRight } from "lucide-react-native"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { AirbnbRating } from "react-native-ratings"
import AsyncStorage from '@react-native-async-storage/async-storage'

//Componentes Utilizados
import { useAuth } from "../../contexts/AuthContext"

//Imagens Utilizadas
import profile from "../../../assets/profile.png"
import document from "../../../assets/Document.png"
import chat from "../../../assets/Chat.png"
import heart from "../../../assets/Heart.png"
import path from "../../../assets/path4542.png"
import profileIcon from "../../../assets/ProfileIcon.png"

//Inicio do Código

export default function Profile({navigation}) {

    const { user } = useAuth();

    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["56%",], [])

    const handleCloseAction = () => bottomSheetref.current?.close()
    const handleOpenPress = () => bottomSheetref.current?.expand();

    const { signOut } = useAuth();
    const handleLogout = async () => {
        try {
            await signOut();
            handleCloseAction(); 
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'StudentScreen' }],
            });
            
            Alert.alert('Sucesso', 'Você foi desconectado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Center>
                    <Text style={styles.headerText}>Perfil</Text>
                </Center>
                <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, width: "100%", top: 20 }} />
            </View>
            <View style={styles.userProfileContainer}>
                <View style={styles.userImageContainer}>
                    <Pressable onPress={() => console.log("clicou na imagem")}>
                        <Image source={profile} alt="imagem de perfil" resizeMode="contain" style={{top:4,}} />
                    </Pressable>
                </View>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userNameText}>{user.nome}</Text>
                    <Text style={styles.userNumberText}>(014) 981503657</Text>
                </View>
                <View style={styles.logoutButtonContainer}>
                    <Button onPress={handleOpenPress} variant="link">
                        <ButtonText style={styles.buttonText}>Logout</ButtonText>
                    </Button>
                </View>
            </View>
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, width: "100%", top: 10 }} />
            <View style={styles.menuContainer}>
                <Pressable onPress={() => navigation.navigate("UserProfileScreen")}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuOptionContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={profileIcon} alt="Suporte" style={{ width: 20, height: 20, }} resizeMode="contain" />
                            </View>
                            <View style={styles.menuTitleContainer}>
                                <Text style={styles.menuText}>Minha Conta</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <ChevronRight color={"#a1a1a1"} />
                        </View>
                    </View>
                </Pressable>
            </View>
            <View style={styles.menuContainer}>
                <Pressable onPress={() => console.log("clicou em Mais lidos")}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuOptionContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={path} alt="Suporte" style={{ width: 20, height: 20, }} resizeMode="contain" />
                            </View>
                            <View style={styles.menuTitleContainer}>
                                <Text style={styles.menuText}>Mais Lidos</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <ChevronRight color={"#a1a1a1"} />
                        </View>
                    </View>
                </Pressable>
            </View>
            <View style={styles.menuContainer}>
                <Pressable onPress={() => navigation.navigate("Favorites")}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuOptionContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={heart} alt="Suporte" style={{ width: 20, height: 20, }} resizeMode="contain" />
                            </View>
                            <View style={styles.menuTitleContainer}>
                                <Text style={styles.menuText}>Seus Favoritos</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <ChevronRight color={"#a1a1a1"} />
                        </View>
                    </View>
                </Pressable>
            </View>
            <View style={styles.menuContainer}>
                <Pressable onPress={() => navigation.navigate("LoanHistory")}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuOptionContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={document} alt="Suporte" style={{ width: 20, height: 20, }} resizeMode="contain" />
                            </View>
                            <View style={styles.menuTitleContainer}>
                                <Text style={styles.menuText}>Histórico de Empréstimo</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <ChevronRight color={"#a1a1a1"} />
                        </View>
                    </View>
                </Pressable>
            </View>
            <View style={styles.menuContainer}>
                <Pressable onPress={() => console.log("clicou em suporte")}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuOptionContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={chat} alt="Suporte" style={{ width: 20, height: 20, }} resizeMode="contain" />
                            </View>
                            <View style={styles.menuTitleContainer}>
                                <Text style={styles.menuText}>Suporte</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <ChevronRight color={"#a1a1a1"} />
                        </View>
                    </View>
                </Pressable>
            </View>
            {/* Inicio do BottomSheet */}
            <BottomSheet
                ref={bottomSheetref}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose={true}
                style={styles.bottomContainer}>
                <SafeAreaView>
                    <View style={styles.bottomSheetContainer}>
                        <View style={styles.bottomSheetHeader}>
                            <Text style={styles.bottomSheetTitle}>Sair</Text>
                            <Text style={styles.bottomSheetSubtitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        </View>
                        <View style={styles.bottomSheetButtonContainer}>
                            <Button
                                size="md"
                                variant="solid"
                                action="primary"
                                isDisabled={false}
                                isFocusVisible={false}
                                style={styles.bottomSheetLogoutButton}
                                onPress={handleLogout}
                            >
                                <ButtonText style={styles.bottomSheetLogoutButtonTitle}>Sair</ButtonText>
                            </Button>
                            <Button
                                size="md"
                                variant="solid"
                                action="primary"
                                isDisabled={false}
                                isFocusVisible={false}
                                style={styles.bottomSheetCancelButton}
                                onPress={handleCloseAction}
                            >
                                <ButtonText style={styles.bottomSheetCancelButtonTitle}>Cancelar</ButtonText>
                            </Button>
                        </View>
                    </View>
                </SafeAreaView>
            </BottomSheet>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff"
    },
    headerContainer: {
        width: "100%",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold"
    },
    userProfileContainer: {
        width: "100%",
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    userImageContainer: {

    },
    userInfoContainer: {
        flexDirection: "column",
        gap: 8,
        right: 35
    },
    userNameText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold"
    },
    userNumberText: {
        fontSize: 14,
        fontWeight: "condensed"
    },
    logoutButtonContainer: {
        marginRight: 10,
    },
    buttonText: {
        color: "#ee2d32",
        fontWeight: "bold",
        fontSize: 17
    },
    menuContainer: {
        flexDirection: "column",
        marginTop: 5,
    },
    menuContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70,
        paddingTop: 10,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    menuOptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30
    },
    iconContainer: {
        backgroundColor: "#EBF2EF",
        borderRadius: 30,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {

    },
    menuTitleContainer: {
        right: 10,
    },
    menuText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 18
    },
    //BottomSheet Styles
    bottomSheetContainer: {
        width: "100%",
        height: "100%",
        margin: 20,
    },
    bottomSheetHeader: {
        width: "90%",
        padding: 10,
        gap: 10
    },
    bottomSheetTitle: {
        color: "#000",
        fontSize: 26,
        fontWeight: "bold",
    },
    bottomSheetSubtitle: {
        color: "#000",
        fontSize: 20,
    },
    bottomSheetButtonContainer: {
        marginTop:20,
        gap:10,
    },
    bottomSheetLogoutButton: {
        backgroundColor: "#ee2d32",
        width: 360,
        height: 55,
        borderRadius:35,
        justifyContent:"center",
        alignItems:"center",
    },
    bottomSheetLogoutButtonTitle: {
        color:"#fff",
        fontSize:22,
        fontWeight:"500",
    },
    bottomSheetCancelButton: {
        backgroundColor: "#FFFFEF",
        width: 360,
        height: 55,
        borderRadius:35,
        justifyContent:"center",
        alignItems:"center",
    },
    bottomSheetCancelButtonTitle: {
        color:"#ee2d32",
        fontSize:22,
        fontWeight:"bold",
    },
});