import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'

const LikeButton = () => {

    const onPress = () => {
        console.log('Clicked like button')
    }

    return (
        <Pressable onPress={() => onPress()}>
            <Icon size={30} name="heart" color={tulipColors.tulipOrange} />
        </Pressable>

    )

}

export default LikeButton
