import { tulipColors } from "@/constants/Colors"
import { StyleSheet, Text, View } from "react-native"
// in the future this will take the as of yet unmigrated quote.caption as a prop
// Profile image will go in on left side in small border rad bubble

const QuoteDetailsInFeed = ({ username, caption }) => {

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
                {'@' + username}
            </Text>
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
