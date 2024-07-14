import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'

const CommentButton = ({ leaveComment }) => {

    return (
        <Pressable onPress={() => leaveComment()}>
            <Icon size={30} name="chatbubble" color={tulipColors.tulipLightOrange} />
        </Pressable>

    )

}

export default CommentButton
