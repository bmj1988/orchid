import LikeButton from './LikeButton'
import SendButton from './SendButton'
import BookmarkButton from './BookmarkButton'
import CommentButton from './CommentButton'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'


const FeedResponseBar = ({ quote, leaveComment, showModal }) => {
    const user = useSelector((state) => state.session.user)
    const liked = () => {
        if (quote.likes.includes(user.id)) return true
        else return false
    }
    return (
        <View style={styles.container}>
            <LikeButton liked={liked() ? "heart" : "heart-outline"} quoteId={quote.id} />
            <SendButton />
            <BookmarkButton showModal={showModal} />
            <CommentButton leaveComment={leaveComment} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
    }
})

export default FeedResponseBar
