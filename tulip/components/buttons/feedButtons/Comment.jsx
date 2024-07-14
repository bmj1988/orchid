import { View, Text, StyleSheet } from 'react-native'

const Comment = ({ comment }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.user}>
                {comment.user.username}
            </Text>
            <Text style={styles.comment}>
                {comment.content}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    user: {
        fontWeight: 'bold'
    },
    comment: {

    },
    container: {

    }
})

export default Comment;
