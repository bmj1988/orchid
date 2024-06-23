import { Pressable } from 'react-native'
import { tulipColors } from '@/constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons'

export default function HorizontalEllipsis({ onPress }) {
    return (
        <Pressable onPress={onPress}>
            <Icon name={'ellipsis-horizontal'} size={40} color={tulipColors.tulipBlack} />
        </Pressable>
    )
}
