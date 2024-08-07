import { StyleSheet, Image, View, StatusBar, Text, ScrollView, } from 'react-native';
import WallButton from '@/components/WallButton'
import { useDispatch, useSelector } from 'react-redux';
import { getUserWalls, wallsArray } from '@/store/wall';
import { tulipColors } from '@/constants/Colors';
import ProfileHeader from '@/components/buttons/ProfileButtons/ProfileHeader'
import { useEffect, useState } from 'react';
import ProfileMenu from '@/components/buttons/ProfileButtons/ProfileMenu'
import { BasicRoundButton } from '@/components/buttons/BasicRoundButton';
import AddWallModal from '@/components/modals/AddWallModal'
import EditProfileModal from '@/components/modals/EditProfileModal'
import BioBar from "@/components/buttons/ProfileButtons/BioBar"

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const walls = useSelector(wallsArray)
  const user = useSelector((state) => state.session.user)
  const [menuVisible, setMenuVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editProfile, setEditProfile] = useState(false)

  useEffect(() => {
    dispatch(getUserWalls())
  }, [])

  return (
    <View style={styles.titleContainer}>
      <ProfileHeader showMenu={() => setMenuVisible(!menuVisible)} />
      {menuVisible && <ProfileMenu setVisible={() => setMenuVisible()} editProfile={() => setEditProfile(true)} />}
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.img }} style={styles.image} />
      </View>
      <Text style={styles.profileName}>{`@` + user.username}</Text>
      <BioBar follows={user.following} followers={user.followers} bio={user.bio} />
      <View style={styles.divider}></View>
      <ScrollView contentContainerStyle={styles.wallScroller}>
        {walls.length > 0 && walls.map((wall) => {
          return (
            <WallButton wall={wall} key={wall.id} />
          )
        })}
      </ScrollView>
      <BasicRoundButton onPress={() => setModalVisible(true)} icon={'add'} />
      <AddWallModal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
      <EditProfileModal isVisible={editProfile} onClose={() => setEditProfile(false)} userBio={user.bio} userAccess={user.access} />
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
