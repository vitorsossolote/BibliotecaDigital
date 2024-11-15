import React, {useState} from "react"
import { StyleSheet, View, TouchableOpacity, Text,Image } from "react-native"

interface Props{
    options: any,
    doSomethingAfertClick:any
}


export const OptionGroup = ({ options, doSomethingAfterClick,}: Props) => {

    const [clickedId , setClickedId] = useState(0)

    const handleClick = (item: any,id : any) => {
        setClickedId(id)
        doSomethingAfterClick(item)
    }
    return (
        <View style={{flexDirection:"row", gap:13}}>{
            options.map((optionLabel: any, index: React.Key | null | undefined,) => {
                return (
                    <TouchableOpacity 
                    onPress={(item: any) => handleClick(item,index)}
                    key={index}
                    style={[index === clickedId ? styles.activeContentOption : styles.contentOption]} 
                    >  
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>{optionLabel}</Text>
                            <Text style={styles.optionSubtitle}>02 Nov</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
        </View>
    )
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: "row",
        marginTop: 20,
        gap: 20,
        right: 5
    },
    contentOption: {
        width: 150,
        height: 80,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        borderColor:"#E8E8E8",
        borderWidth:2,
    },
    activeContentOption:{
        width: 150,
        height: 80,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        borderColor:"#ee2d32",
        borderWidth:2,
    },
    textContainer: {
        alignSelf: "center",
        gap:5,
    },
    optionTitle: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    optionSubtitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
});