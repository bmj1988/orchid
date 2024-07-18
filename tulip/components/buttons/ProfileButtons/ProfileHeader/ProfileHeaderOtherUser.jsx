import { StyleSheet, View } from 'react-native'
import FollowButton from './ProfileFollowButton'

export default function ProfileHeaderForOtherUserProfile({ currentFollower }) {
    return (
        <View style={styles.icons}>
            <FollowButton style={styles.follow} currentFollower={currentFollower} />
        </View>
    )
}

const styles = StyleSheet.create({
    icons: {
        width: "95%",
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    follow: {
        marginLeft: 10
    },
})
