import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
} from "@gluestack-ui/themed";
import {MotiView,MotiImage} from 'moti';
import { config } from "@gluestack-ui/config";
import MainHeader from "../../components/MainHeader/index";
import Carrosel from "../../components/Carrousel/index";
import Reservar from "../../components/ReservarNovamente/index";
import Section from "../../components/Section/index";
import TrendingBooks from "../../components/TrendingBooks/index";
import TrendingGenders from "../../components/TrendingGenders/index";
import Authors from "../../components/Authors/index";

const Home = () => (
    <GluestackUIProvider config={config}>
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <MainHeader title="Inicio"/>
            <MotiView from={{translateX:200}} animate={{translateX:0}} transition={{duration:3000, type:"spring"}}>
            <Carrosel/>
            </MotiView>
            <MotiView from={{translateX:-200}} animate={{translateX:0}} transition={{duration:3000, type:"spring"}}>
            <Reservar/>
            </MotiView>
            <MotiView from={{translateY:200}} animate={{translateY:0}} trainsition={{duration:3000,type:"timing"}}>
            <Section title="Melhores da Semana"/>
            <TrendingBooks/>
            </MotiView>
            <Section title="Melhores Generos"/>
            <TrendingGenders/>
            <Section title="Autores"/>
            <Authors/>
        </ScrollView>
    </SafeAreaView>
    </GluestackUIProvider>
)

export default Home;