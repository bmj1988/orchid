import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'

const CommentButton = () => {

    const onPress = () => {
        console.log('Clicked comment button')
    }

    return (
        <Pressable onPress={() => onPress()}>
            <Icon size={30} name="chatbubble" color={tulipColors.tulipLightOrange} />
        </Pressable>

    )

}

export default CommentButton
