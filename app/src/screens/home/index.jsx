import React from "react";
import {
    SafeAreaView,
} from "@gluestack-ui/themed"
import { MotiView,} from 'moti'
import { ScrollView, } from "react-native"
import { Search, Bell, } from 'lucide-react-native';
import MainHeader from "../../Components/MainHeader/index";
import Carrosel from "../../Components/Carrousel/index";
import Reservar from "../../Components/ReservarNovamente/index";
import Section from "../../Components/Section/index";
import TrendingBooks from "../../Components/TrendingBooks/index";
import TrendingGenders from "../../Components/TrendingGenders/index";
import Authors from "../../Components/Authors/index";
import AuthorsScreen from "../authors/index";


const Home = () => (
    <SafeAreaView>
            <MotiView
                from={{ translateX: 0, }}
                animate={{ translateX: -415 }}
                transition={{ duration: 1300, type: "timing" }}
            >
                <ScrollView>
                    <MainHeader title="Inicio" icon1={Search} icon2={Bell} />
                    <Carrosel />
                    <Reservar />
                    <Section title="Melhores da Semana" />
                    <TrendingBooks />
                    <Section title="Melhores Generos" />
                    <TrendingGenders />
                    <Section title="Autores" />
                    <Authors />
                </ScrollView>
                <MotiView style={{position:"absolute"}}
                from={{ translateX: 415, }}
                animate={{ translateX: 415 }}
                transition={{ duration: 1300, type: "timing" }}
            >
                <AuthorsScreen/>
            </MotiView>
            </MotiView>
    </SafeAreaView>
)

export default Home;