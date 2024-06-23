import Icon from 'react-native-vector-icons/FontAwesome'
import { tulipColors } from '@/constants/Colors'
import { StyleSheet, View, Text } from 'react-native'

const FeedIconQuote = ({ quote, author }) => {

    return (
        <View>
            <Icon name="sticky-note" size={220} color={tulipColors.tulipOrange} />
            <View style={styles.textView}>
                <Text numberOfLines={4} style={[styles.text, { fontFamily: 'PlayfairDisplay' }]}>{quote}</Text>
                <Text style={[styles.text, { fontFamily: 'Allison', fontSize: 25 }]}>
                    {author}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        position: 'absolute',
        top: 7,
        width: 200,
        padding: 10,
        paddingRight: 30,
    },
    text: {
        color: tulipColors.tulipBlack,
    }

})

export default FeedIconQuote;
