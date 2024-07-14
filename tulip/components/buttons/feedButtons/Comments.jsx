import { View } from 'react-native'
import Comment from './Comment'

const Comments = ({ comments }) => {

    const comments = useSelector((state) => state.feed[quoteId].comments)

    return (
        <View>
            {comments.map((comment) => {
                return (
                    <Comment comment={comment}></Comment>
                )
            })}
        </View>
    )
}

export default Comments;
