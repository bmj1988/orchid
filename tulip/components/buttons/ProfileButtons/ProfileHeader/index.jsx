import { StyleSheet, View } from 'react-native'
import ProfileMenuButton from './ProfileMenuButton'

export default function ProfileHeader({ showMenu }) {
    return (
        <View style={styles.icons}>
            <ProfileMenuButton style={styles.profileOptions} onPress={showMenu} />
        </View>
    )
}

const styles = StyleSheet.create({
    icons: {
        width: "95%",
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    follow: {
        marginLeft: 10
    },
    profileOptions: {
        marginRight: 10
    },
})
