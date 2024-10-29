import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
} from "@gluestack-ui/themed";
import {MotiView,MotiImage} from 'moti';
import { config } from "@gluestack-ui/config";
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