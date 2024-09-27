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
import MainHeader from "../../Components/MainHeader/index";
import Carrosel from "../../Components/Carrousel/index";
import Reservar from "../../Components/ReservarNovamente/index";
import Section from "../../Components/Section/index";
import TrendingBooks from "../../Components/TrendingBooks/index";
import TrendingGenders from "../../Components/TrendingGenders/index";
import Authors from "../../Components/Authors/index";

const Home = () => (
    <GluestackUIProvider config={config}>
    <SafeAreaView>
        <ScrollView>
            <MainHeader title="Inicio"/>
            <Carrosel/>
            <Reservar/>
            <Section title="Melhores da Semana"/>
            <TrendingBooks/>
            <Section title="Melhores Generos"/>
            <TrendingGenders/>
            <Section title="Autores"/>
            <Authors/>
            <TrendingBooks/>

        </ScrollView>
    </SafeAreaView>
    </GluestackUIProvider>
)

export default Home;