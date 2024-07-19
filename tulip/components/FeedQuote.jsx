import { StyleSheet, View } from "react-native"
import IconQuote from '@/components/buttons/feedButtons/FeedIconQuote'
import ResponseBar from './buttons/feedButtons/ReactionBar'
import QuoteDetails from './Feed/QuoteDetails'
import CommentsSection from './Feed/CommentsSection'
import { useState } from "react"
import LeaveComment from "./Feed/LeaveComment"
import SaveQuoteModal from "./modals/SaveQuoteModal"

const FeedQuote = ({ quote }) => {
    const [leaveComment, showLeaveComment] = useState(false)
    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.container}>
            <View>
                <IconQuote quote={quote.content} author={quote.author} />
                <ResponseBar quote={quote} leaveComment={() => showLeaveComment(!leaveComment)} showModal={() => setVisible(true)} />
                <QuoteDetails username={quote.user.username} caption={quote.caption ? quote.caption : "No caption provided"} userId={quote.user.id} />
                <CommentsSection comments={quote.comments} />
                {leaveComment && <LeaveComment quoteId={quote.id} onClose={() => showLeaveComment(!leaveComment)} />}
            </View>
            <SaveQuoteModal isVisible={visible} onClose={() => setVisible(false)} quote={quote} />
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
