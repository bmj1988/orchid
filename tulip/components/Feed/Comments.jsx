import { Pressable, StyleSheet, Text } from 'react-native'
import { tulipColors } from '@/constants/Colors'
import { useState } from 'react'
import Comments from '../buttons/feedButtons/Comments'

const ViewCommentsPress = ({ comments }) => {

    const [showComments, setShowComments] = useState(false)

    return (
        <View>
            {!showComments && <Pressable onPress={() => setShowComments(true)}>
                <Text>
                    {'View comments'}
                </Text>
            </Pressable>}
            {showComments && <>
                <Comments comments={comments}></Comments>
                <Pressable onPress={() => setShowComments(false)}>
                    <Text>{'Collapse comments'}</Text>
                </Pressable>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    color: tulipColors.tulipBlack
})

export default ViewCommentsPress
