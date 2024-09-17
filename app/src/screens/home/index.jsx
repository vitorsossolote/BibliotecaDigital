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
import Reservar from "../../components/ReservarNovamente";
import Section from "../../components/Section";
import TrendingBooks from "../../components/TrendingBooks";
import TrendingGenders from "../../components/TrendingGenders";
import Authors from "../../components/Authors";

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