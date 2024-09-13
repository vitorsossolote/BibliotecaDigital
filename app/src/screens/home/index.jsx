import React from "react";
import {
    GluestackUIProvider,
    Spinner,
    SafeAreaView,
    Image,
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Heading,
    ScrollView,
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View,} from "react-native"
import { config } from "@gluestack-ui/config"
import MainHeader from "../../components/MainHeader";
import Carrosel from "../../components/Carrousel";

const Home = () => (
    <GluestackUIProvider config={config}>
        <ScrollView>
            <MainHeader title="Inicio"/>
            <Carrosel/>
        </ScrollView>
    </GluestackUIProvider>
)

export default Home;