import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'

const BookmarkButton = ({ showModal }) => {

    return (
        <Pressable onPress={() => showModal()}>
            <Icon size={30} name="bookmark" color={tulipColors.tulipGreen} />
        </Pressable>

    )

}

export default BookmarkButton
