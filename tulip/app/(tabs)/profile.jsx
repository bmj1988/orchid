import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, StatusBar, Text, ScrollView, Pressable } from 'react-native';
import WallButton from '@/components/WallButton'
import { useSelector } from 'react-redux';
import { wallsArray } from '@/store/wall';
import { tulipColors } from '@/constants/Colors';
import ProfileHeader from '@/components/buttons/ProfileButtons/ProfileHeader'
import { useState } from 'react';
import ProfileMenu from '@/components/buttons/ProfileButtons/ProfileMenu'
import { BasicRoundButton } from '@/components/buttons/BasicRoundButton';

export default function TabTwoScreen() {
  const walls = useSelector(wallsArray)
  const user = useSelector((state) => state.session.user)
  const [menuVisible, setMenuVisible] = useState(false)

  const newWall = () => {
    console.log('hi')
  }

  return (
    <View style={styles.titleContainer}>
      <ProfileHeader showMenu={() => setMenuVisible(!menuVisible)} />
      {menuVisible && <ProfileMenu setVisible={() => setMenuVisible()} />}
      <View style={styles.imageContainer}>
        <Image source={user.img || require('../../assets/images/HeadshotBlueBackground.jpg')} style={styles.image} />
      </View>
      <Text style={styles.profileName}>{`@` + user.name}</Text>
      <View style={styles.divider}></View>
      <ScrollView contentContainerStyle={styles.wallScroller}>
        {walls.length > 0 && walls.map((wall) => {
          return (
            <WallButton wall={wall} key={wall.id} />
          )
        })}
      </ScrollView>
      <BasicRoundButton onPress={() => newWall()} icon={'add'} />
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
