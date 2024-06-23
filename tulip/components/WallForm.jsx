import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"


const WallForm = ({ wall, color }) => {

    return (
        <TouchableOpacity onPress={() => router.push({ pathname: '/wall', params: {wallId: wall.id} })} style={[styles.wall, { backgroundColor: color }]}>
            <Text style={styles.name}>{wall.name}</Text>
            <Text style={styles.visibility}>{wall.access}</Text>
            <Text style={styles.visibility}>{wall._count ? wall._count.quotes : 0}{" Quotes"}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wall: {
        width: 150,
        height: 150,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    name: {
        fontSize: 20,
        color: "white"
    },
    visibility: {
        fontSize: 14,
        color: "white"
    }
})

export default WallForm;
