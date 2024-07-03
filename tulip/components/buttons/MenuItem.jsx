import { Pressable, StyleSheet, Text } from 'react-native'
import { tulipColors } from '@/constants/Colors'

const MenuItem = ({ text, onPress, position }) => {


    return (
        <Pressable onPress={() => onPress()} style={styles[position]}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    top: {
        borderBottomWidth: 1,
        borderBottomColor: tulipColors.tulipBlack
    },
    center: {
        borderBottomWidth: 1,
        borderBottomColor: tulipColors.tulipBlack,
    },
    bottom: {
    },
    text: {
        color: tulipColors.tulipBlack,
        fontFamily: 'PlayfairDisplay',
        fontSize: 20
    }
})

export default MenuItem;
