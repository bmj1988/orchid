import { tulipColors } from "@/constants/Colors";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'


const WallForm = ({ wall }) => {

    return (
        <TouchableOpacity onPress={() => router.push({ pathname: '/wall', params: { wallId: wall.id } })} style={styles.wall}>
            <Icon name={'sticky-note'} size={160} color={tulipColors.tulipOrange} />
            <View style={styles.text}>
                <Text style={styles.name}>{wall.name + " "}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wall: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    text: {
        position: 'absolute',
        top: 40
    },
    name: {
        fontSize: 35,
        color: tulipColors.tulipWhite,
        fontFamily: 'Allison'
    },
    visibility: {
        fontSize: 14,
        color: "white"
    },
})

export default WallForm;
