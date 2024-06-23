import { Pressable, StyleSheet, Text } from 'react-native'
import { tulipColors } from '@/constants/Colors'

export default function ProfileFollowButton() {

    const press = () => {
        console.log('click')
    }

    return (
        <Pressable onPress={() => press()} style={styles.button}>
            <Text style={styles.text}>
                {'follow'}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: tulipColors.tulipBlue,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    text: {
        fontFamily: 'sans-serif',
        color: tulipColors.tulipBlack,
        fontWeight: 'bold',
        fontSize: 20
    }
})
