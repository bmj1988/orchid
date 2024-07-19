import { Pressable, StyleSheet, Text } from 'react-native'
import { tulipColors } from '@/constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { thunkFollow, thunkUnfollow } from '@/store/profile';
import { useEffect, useState } from 'react';

export default function ProfileFollowButton() {
    const dispatch = useDispatch();
    const [follower, setFollower] = useState(false)

    const user = useSelector((state) => state.profile)
    const viewer = useSelector((state) => state.session.user)

    useEffect(() => {
        if (user.followers && user.followers[viewer.id]) {
            setFollower(true)
        }
        else setFollower(false)
    }, [user])

    const press = async () => {
        if (follower) {
            await dispatch(thunkUnfollow(user.id, viewer.id))
            setFollower(!follower)
        }
        else {
            await dispatch(thunkFollow(user.id, viewer.id))
            setFollower(!follower)
        }
    }

    return (
        <Pressable onPress={() => press()} style={styles.button}>
            <Text style={styles.text}>
                {follower ? 'unfollow' : 'follow'}
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
        borderRadius: 5,
        padding: 5
    },
    text: {
        fontFamily: 'sans-serif',
        color: tulipColors.tulipBlack,
        fontWeight: 'bold',
        fontSize: 20
    }
})
