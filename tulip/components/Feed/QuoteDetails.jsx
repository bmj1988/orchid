import { tulipColors } from "@/constants/Colors"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { router } from "expo-router";

// in the future this will take the as of yet unmigrated quote.caption as a prop
// Profile image will go in on left side in small border rad bubble

const QuoteDetailsInFeed = ({ username, caption, userId }) => {


    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.push({ pathname: '/profileview', params: { id: userId } })}>
                <Text style={[styles.text, { fontWeight: 'bold' }]}>
                    {'@' + username}
                </Text>
            </Pressable>
            <Text numberOfLines={1}>
                {caption}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        color: tulipColors.tulipBlack,
        paddingRight: 5,
    }
})

export default QuoteDetailsInFeed
