import React, {useState} from "react"
import { StyleSheet, View, TouchableOpacity, Text,Image } from "react-native"
import emailBulk from "../../../assets/Email-Bulk.png"

const Props = () => {
    options: any;
    doSomethingAfertClick:any
}


//TODO Arrumar icone
export const OptionGroup = (props : Props) => {

    const [clickedId , setClickedId] = useState(0)

    const handleClick = (item,id) => {
        setClickedId(id)
        doSomethingAfterClick(item)
    }
    return (
        <View style={{flexDirection:"row", gap:13}}>{
            options.map((optionLabel, index, ) => {
                return (
                    <TouchableOpacity 
                    onPress={(item) => handleClick(item,index)}
                    key={index}
                    style={[index === clickedId ? styles.activeContentOption : styles.contentOption]} 
                    >   
                        <Image source={emailBulk} style={styles.Icon} />
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>{optionLabel}</Text>
                            <Text style={styles.optionSubtitle}>Enviar para seu {optionLabel}</Text>
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
        backgroundColor: "#f1f1f1",
        width: 170,
        height: 170,
        borderRadius: 20,
        flexDirection: "column",
        justifyContent: "center",
    },
    activeContentOption:{
        backgroundColor: "#f1f1f1",
        width: 170,
        height: 170,
        borderRadius: 20,
        flexDirection: "column",
        justifyContent: "center",
        borderColor:"#ee2d32",
        borderWidth:2,
    },
    Icon: {
        width: 30,
        height: 30,
        left: 15
    },
    textContainer: {
        alignSelf: "flex-end",
        top: 30,
        right: 20,
        width:"100%",
        left:15,
    },
    optionTitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    optionSubtitle: {
        color: "#a6a6a6",
        fontSize: 13,
    },
});