import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'

const BookmarkButton = () => {


    const onPress = () => {
        console.log('Clicked bookmark button')
    }

    return (
        <Pressable onPress={() => onPress()}>
            <Icon size={30} name="bookmark" color={tulipColors.tulipGreen}/>
        </Pressable>

    )

}

export default BookmarkButton
