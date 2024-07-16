import { Pressable, StyleSheet, Text, View } from 'react-native'
import { tulipColors } from '@/constants/Colors'
import { useState } from 'react'
import Comments from '../buttons/feedButtons/Comments'

const ViewCommentsPress = ({ comments }) => {

    const [showComments, setShowComments] = useState(false)

    return (
        <View>
            {!showComments && <Pressable onPress={() => setShowComments(true)}>
                <Text style={styles.action}>
                    {'View comments'}
                </Text>
            </Pressable>}
            {showComments && <>
                <Comments comments={comments}></Comments>
                <Pressable onPress={() => setShowComments(false)}>
                    <Text style={styles.action}>{'Collapse comments'}</Text>
                </Pressable>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    action: {
        textDecorationColor: tulipColors.tulipBlack,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    }
})

export default ViewCommentsPress
