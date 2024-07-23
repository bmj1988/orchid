import { StatusBar, StyleSheet, View } from "react-native"
import MenuItem from "../MenuItem"
import { tulipColors } from "@/constants/Colors"
import { router } from "expo-router"


const ProfileMenu = ({ setVisible, editProfile }) => {

    return (
        <View style={styles.container}>
            <MenuItem text={'Edit Profile'} onPress={() => {
                editProfile()
                setVisible()
            }}
                position={'top'} />
            <MenuItem text={'Delete Account'} onPress={() => console.log('click delete')} position={'center'} />
            <MenuItem text={'Support'} onPress={() => router.push('support')} position={'center'} />
            <MenuItem text={'Close Menu'} onPress={() => setVisible()} position={'bottom'} />
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
        top: StatusBar.currentHeight + 35,
        zIndex: 2,
        padding: 5,
        right: 10,
    },
})

export default ProfileMenu;
