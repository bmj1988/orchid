import { StatusBar, StyleSheet, View } from "react-native"
import MenuItem from "../MenuItem"
import { tulipColors } from "@/constants/Colors"
import { thunkDeleteWall } from "@/store/wall"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"

const WallMenu = ({ setVisible, wallId, editModal }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const deleteWall = async () => {
        dispatch(thunkDeleteWall(wallId)).then(() => router.replace('(tabs)'))
    }

    return (
        <View style={styles.container}>
            <MenuItem text={'Edit Wall'} onPress={() => {
                setVisible()
                editModal()
                }} position={'top'} />
            <MenuItem text={'Delete Wall'} onPress={() => deleteWall()} position={'center'} />
            <MenuItem text={'Close'} onPress={() => setVisible()} position={'bottom'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: tulipColors.tulipGreen,
        borderWidth: 2,
        borderColor: tulipColors.tulipBlack,
        borderRadius: 5,
        position: 'absolute',
        top: StatusBar.currentHeight,
        zIndex: 2,
        padding: 5,
        width: 120,
        left: 10
    },
})

export default WallMenu
