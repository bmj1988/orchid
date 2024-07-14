import { StyleSheet, Text, View } from "react-native"
import IconQuote from '@/components/buttons/feedButtons/FeedIconQuote'
import ResponseBar from './buttons/feedButtons/ReactionBar'
import QuoteDetails from './Feed/QuoteDetails'
import CommentsSection from './Feed/CommentsSection'
import { useState } from "react"

const FeedQuote = ({ quote }) => {
    console.log("QUOTE", quote)
    const [leaveComment, showLeaveComment] = useState(false)
    return (
        <View style={styles.container}>
            <View>
                <IconQuote quote={quote.content} author={quote.author} />
                <ResponseBar quote={quote} leaveComment={() => showLeaveComment(!leaveComment)}/>
                <QuoteDetails username={quote.user.username} caption={quote.caption ? quote.caption : "No caption provided"} />
                <CommentsSection comments={quote.comments} />
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
