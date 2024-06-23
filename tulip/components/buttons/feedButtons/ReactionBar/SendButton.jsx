import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'

const SendButton = () => {

    const onPress = () => {
        console.log('Clicked send button')
    }

    return (
        <Pressable onPress={() => onPress()}>
            <Icon size={30} name="send" color={tulipColors.tulipBlue}/>
        </Pressable>

    )

}

export default SendButton
