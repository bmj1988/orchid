import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, StatusBar, Text, Button, ScrollView } from 'react-native';
import WallButton from '@/components/WallButton'
import { useSelector } from 'react-redux';
import { wallsArray } from '@/store/wall';
import { orchidColors } from '@/constants/Colors';

export default function TabTwoScreen() {
  const walls = useSelector(wallsArray)
  const user = useSelector((state) => state.session.user)

  return (
    <View style={styles.titleContainer}>
      <View style={styles.topIcons}>
        <Button title="follow" color={orchidColors.orchidMint}/>
        <Ionicons size={40} name="ellipsis-horizontal" />
      </View>
      <View style={styles.imageContainer}>
        <Image source={user.img || require('../../assets/images/HeadshotBlueBackground.jpg')} style={styles.image} />
      </View>
      <Text style={styles.profileName}>{`@`+user.name}</Text>
      <View style={styles.divider}></View>
      <ScrollView contentContainerStyle={styles.wallScroller}>
        {walls.length > 0 && walls.map((wall) => {
          return (
            <WallButton wall={wall} key={wall.id}/>
          )
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: orchidColors.orchidEggshell,
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
  topIcons: {
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
  wallScroller: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10
  }

});
