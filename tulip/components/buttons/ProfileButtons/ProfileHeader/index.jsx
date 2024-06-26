import { StyleSheet, View } from 'react-native'
import FollowButton from './ProfileFollowButton'
import ProfileMenuButton from './ProfileMenuButton'

export default function ProfileHeader() {
    return (
        <View style={styles.icons}>
            <FollowButton style={styles.follow} />
            <ProfileMenuButton style={styles.profileOptions} />
        </View>
    )
}

const styles = StyleSheet.create({
    icons: {
        width: "95%",
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    follow: {
        marginLeft: 10
    },
    profileOptions: {
        marginRight: 10
    },
})
