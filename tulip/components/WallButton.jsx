import { orchidColors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native"


const WallButton = ({ wall }) => {

    return (
        <View style={[styles.wallView, { backgroundColor: orchidColors.orchidLavender }]}>
            <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: '/wall', params: { wallId: wall.id } })}>
                <Text style={styles.text}>
                    {wall.name}
                </Text>
                <Ionicons size={30} name="ellipsis-horizontal" color={orchidColors.orchidMint} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wallView: {
        width: 220,
        height: 100,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 8,
        elevation: 5,
    },
    button: {
        backgroundColor: "inherit",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white",
        fontSize: 25,
    }
})

export default WallButton
