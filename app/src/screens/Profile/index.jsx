// Profile

//Bibliotecas Utilizadas
import React from "react"
import { Center, View, Text, Image, Button, ButtonText } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, Pressable } from "react-native"
import { ChevronRight } from "lucide-react-native"
//Componentes Utilizados


//Imagens Utilizadas
import profile from "../../../assets/profile.png"
import document from "../../../assets/Document.png"
import chat from "../../../assets/Chat.png"
import heart from "../../../assets/Heart.png"
import path from "../../../assets/path4542.png"
import profileIcon from "../../../assets/ProfileIcon.png"
//Inicio do Código
const Profile = () => (
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
                    <Image source={profile} alt="imagem de perfil" resizeMode="contain" />
                </Pressable>
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userNameText}>Vitor Sossolote</Text>
                <Text style={styles.userNumberText}>(014) 981503657</Text>
            </View>
            <View style={styles.logoutButtonContainer}>
                <Button onPress={() => console.log("clicou em logout")}>
                    <ButtonText style={styles.buttonText}>Logout</ButtonText>
                </Button>
            </View>
        </View>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, width: "100%", top: 10 }} />
        <View style={styles.menuContainer}>
            <Pressable onPress={() => console.log("clicou em minha conta")}>
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
            <Pressable onPress={() => console.log("clicou em seus favoritos")}>
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
            <Pressable onPress={() => console.log("clicou em histórico")}>
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
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
});

export default Profile