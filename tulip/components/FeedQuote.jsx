import { StyleSheet, Text, View } from "react-native"
import IconQuote from '@/components/buttons/feedButtons/FeedIconQuote'
import ResponseBar from './buttons/feedButtons/ReactionBar'
import QuoteDetails from './Feed/QuoteDetails'
import CommentsSection from './Feed/Comments'

const FeedQuote = ({ quote }) => {
    return (
        <View style={styles.container}>
            <View>
                <IconQuote quote={quote.content} author={quote.author} />
                <ResponseBar />
                <QuoteDetails username={"demo"} />
                <CommentsSection />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
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
