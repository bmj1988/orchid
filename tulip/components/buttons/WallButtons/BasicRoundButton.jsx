import { StyleSheet, Pressable } from 'react-native'
import { orchidColors } from '../../../constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons'

export const BasicRoundButton = ({ onPress, icon }) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Icon name={icon} style={styles.icon} size={25} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orchidColors.orchidLavender,
        height: 60,
        width: 60,
        borderRadius: 50,
        elevation: 10,
        margin: 20
    },
    icon: {
        color: orchidColors.orchidMint
    }
})
