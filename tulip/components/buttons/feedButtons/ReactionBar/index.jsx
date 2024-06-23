import LikeButton from './LikeButton'
import SendButton from './SendButton'
import BookmarkButton from './BookmarkButton'
import CommentButton from './CommentButton'
import { View, StyleSheet } from 'react-native'


const FeedResponseBar = () => {
    return (
        <View style={styles.container}>
            <LikeButton />
            <SendButton />
            <BookmarkButton />
            <CommentButton />
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
