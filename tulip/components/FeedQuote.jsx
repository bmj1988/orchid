import { StyleSheet, Text, View } from "react-native"
import QuoteNote from "./QuoteNote"
import { Ionicons } from "@expo/vector-icons"
import { orchidColors } from "@/constants/Colors"

const FeedQuote = ({ quote }) => {
    return (
        <View style={styles.container}>
            <View style={styles.metasBar}>
                <View style={styles.iconNameView}>
                    <Ionicons size={40} name="person-circle" color={"blue"} />
                    <Text>{'Demo'}</Text>
                </View>
                <Text>{"Posted on: " + quote.createdAt}</Text>
            </View>
            <View>
                <QuoteNote quote={quote.content} author={quote.author} color={orchidColors.orchidLavender} />
            </View>
            <View style={styles.iconRow}>
                <Ionicons size={30} name="heart-outline" />
                <Ionicons size={30} name="chatbox-ellipses-outline" />
                <Ionicons size={30} name="send-outline" />
                <Ionicons size={30} name="bookmark-outline" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    metasBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconNameView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 10
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }

})

export default FeedQuote;
