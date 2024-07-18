import { StyleSheet, Image, View, StatusBar, Text, ScrollView, } from 'react-native';
import WallButton from '@/components/WallButton'
import { useDispatch, useSelector } from 'react-redux';
import { tulipColors } from '@/constants/Colors';
import ProfileHeader from '@/components/buttons/ProfileButtons/ProfileHeader/ProfileHeaderOtherUser'
import { useEffect, useState } from 'react';
import BioBar from "@/components/buttons/ProfileButtons/BioBar"
import { thunkLoadProfile } from '../../store/profile';
import { useLocalSearchParams } from 'expo-router'

export default function UserProfile() {
    const { id } = useLocalSearchParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkLoadProfile(id))
    }, [id])
    const user = useSelector((state) => state.profile)
    const viewer = useSelector((state) => state.session.user)
    const walls = user.walls ? user.walls : []
    const currentFollower = () => {
        if (!user.followedBy || !user.followedBy[viewer.id]) return false
        return true
    }
    const current = currentFollower()
    console.log(current)
    console.log("USER", user)

    return (
        <View style={styles.titleContainer}>
            <ProfileHeader currentFollower={current} />
            <View style={styles.imageContainer}>
                <Image source={{ uri: user.img }} style={styles.image} />
            </View>
            <Text style={styles.profileName}>{`@` + user.username}</Text>
            <BioBar follows={user._count && user._count.following ? user._count.following : 0} followedBy={user.followedBy ? Object.values(user.followedBy).length : 0} bio={user.bio} />
            <View style={styles.divider}></View>
            <ScrollView contentContainerStyle={styles.wallScroller}>
                {walls.length > 0 && walls.map((wall) => {
                    return (
                        <WallButton wall={wall} key={wall.id} />
                    )
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: tulipColors.tulipWhite,
        paddingBottom: 35,
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center'
    },
    profileName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 70
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        margin: 20
    },
    wallScroller: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 10
    }

});
