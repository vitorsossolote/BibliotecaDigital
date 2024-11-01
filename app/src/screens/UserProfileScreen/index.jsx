import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Image,
    Center,
} from "@gluestack-ui/themed"
import BackHeader from '../../components/BackHeader/index';
import MainHeader from '../../components/MainHeader/index';
import { ArrowLeft } from "lucide-react-native"

import InputTest from '../../components/InputTest/index';

import changeProfile from "../../../assets/changeProfile.png"
const UserProfileScreen = () => {
    return (
        <SafeAreaView>
            <MainHeader title='Meu Perfil' icon1={ArrowLeft} onPress={() => console.log("Pressionou em voltar")} />
            <View style={styles.userImageContainer}>
                <Image source={changeProfile} style={styles.userImage} resizeMode="contain" alt="foto de perfil" />
                <Button variant="link" onPress={() => console.log("Clicou em trocar a foto")}>
                    <ButtonText style={styles.changeImageButton}>Trocar Foto</ButtonText>
                </Button>
            </View>
            <View style={styles.infoContainer}>
                <InputTest
                    inputText="John"
                    formTitle="Nome"
                // valuee={email}
                // onChangeText={text => setEmail(text)}
                />
                <InputTest
                    inputText="johndoe@email.com"
                    formTitle="Email"
                // valuee={email}
                // onChangeText={text => setEmail(text)}
                />
                <InputTest
                    inputText="(+1) 234 567 890"
                    formTitle="Numero de telefone"
                // valuee={email}
                // onChangeText={text => setEmail(text)}
                />
                <InputTest
                    inputText="*******"
                    formTitle="Senha"
                // valuee={email}
                // onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    style={styles.changeButton}
                    onPress={() => console.log("Clico em Sair")}
                >
                    <ButtonText style={styles.changeButtonText}>Salvar Alterações</ButtonText>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginHorizontal: 20,
        height: 160,
        flexDirection: 'row',
        backgroundColor: "#f6f6f6",
        borderRadius: 20,
        marginTop: 15,
    },
    userImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    userImage: {
        width: 120,
        height: 120
    },
    changeImageButton: {
        color: "#ee2d32",
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoContainer: {
        gap: 30
    },
    buttonContainer:{
        alignItems:"center",
        marginTop:50
    },
    changeButton: {
        backgroundColor: "#ee2d32",
        width: 330,
        height: 55,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    changeButtonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "500",
    },

});

export default UserProfileScreen;