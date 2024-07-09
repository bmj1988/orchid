import { tulipColors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native"


const WallButton = ({ wall }) => {

    return (
        <View style={[styles.wallView, { backgroundColor: wall.color }]}>
            <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/wall', params: { wallId: wall.id } })}>
                <Text style={styles.text}>
                    {wall.name}
                </Text>
                <Ionicons size={30} name="ellipsis-horizontal" color={tulipColors.tulipWhite} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wallView: {
        width: 250,
        height: 80,
        justifyContent: 'center',
        alignItems: "center",
        elevation: 5,
    },
    button: {
        backgroundColor: "inherit",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: tulipColors.tulipWhite,
        fontFamily: 'sans-serif',
        fontSize: 25,
    }
})

export default WallButton
