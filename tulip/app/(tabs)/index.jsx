import { Image, StyleSheet, Platform, Text, ScrollView, View, Button } from 'react-native';
import WallForm from '@/components/WallForm';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserWalls, wallsArray } from '../../store/wall'
import { orchidColors } from '@/constants/Colors';
import { AddWallButton } from '@/components/buttons/WallButtons/AddWall'
const name = "Walls"


export default function WallScreen() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserWalls())
  }, [])
  const walls = useSelector(wallsArray)


  return (
    <View style={styles.titleContainer}>
      <View style={styles.bar}></View>
      <Text style={styles.logo}>{name}</Text>
      <ScrollView contentContainerStyle={styles.wallContainer}>
        {walls.length > 0 && walls.map((wall) => {
          return (
            <WallForm color={orchidColors.orchidLavender} wall={wall} key={wall.id} />
          )
        })}
      </ScrollView>
      <AddWallButton />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    overflow: "scroll",
    backgroundColor: orchidColors.orchidEggshell
  },
  wallContainer: {
    gap: 8,
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 350,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  logo: {
    color: 'black',
    fontSize: 50,
    marginBottom: 100,
  },
  bar: {
    height: StatusBar.currentHeight,
  }
});
