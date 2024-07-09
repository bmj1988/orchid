import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const AddUserButton = ({ onPress }) => {
    return (
        <Pressable onPress={() => onPress()}>
            <Icon name="person-add" size={30} />
        </Pressable>
    )
}

export default AddUserButton
