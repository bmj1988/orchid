import { useDispatch } from 'react-redux'
import { thunkCreateWall } from '../../../store/wall'
import { StyleSheet, Pressable } from 'react-native'
import { orchidColors } from '../../../constants/Colors'
import Icon from 'react-native-vector-icons/AntDesign/'

export const AddWallButton = () => {
    const dispatch = useDispatch()

    const createNewWall = async () => {
        const wall = {
            name: 'New!'
        }
        await dispatch(thunkCreateWall(wall))

    }

    return (
        <Pressable onPress={() => createNewWall()} style={styles.button}>
            <Icon name="plus" size={30} color={orchidColors.orchidMint} />
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
        height: 25,
        width: 25,
        color: orchidColors.orchidMint
    }
})
