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
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: tulipColors.tulipBlack
    },
    center: {
        borderBottomWidth: 1,
        borderBottomColor: tulipColors.tulipBlack,
    },
    bottom: {
        // borderBottomLeftRadius: 8,
        // borderBottomRightRadius: 8,
    },
    text: {
        color: tulipColors.tulipBlack,
        fontFamily: 'PlayfairDisplay',
    }
})

export default MenuItem;
