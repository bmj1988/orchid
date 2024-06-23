import { StyleSheet, Text, ScrollView, View } from 'react-native';
import WallForm from '@/components/WallForm';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserWalls, wallsArray } from '../../store/wall'
import { tulipColors } from '@/constants/Colors';
import { AddWallButton } from '@/components/buttons/WallButtons/AddWall'

export default function WallScreen() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserWalls())
  }, [])
  const walls = useSelector(wallsArray)


  return (
    <View style={styles.titleContainer}>
      <View style={styles.bar}></View>
      <Text style={styles.logo}>{'GALLERY'}</Text>
      <ScrollView contentContainerStyle={styles.wallContainer}>
        {walls.length > 0 && walls.map((wall) => {
          return (
            <WallForm color={tulipColors.orchidLavender} wall={wall} key={wall.id} />
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
    backgroundColor: tulipColors.orchidEggshell
  },
  wallContainer: {
    gap: 8,
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 350,
  },
  logo: {
    color: 'black',
    fontSize: 60,
    marginBottom: 80,
    fontFamily: 'PlayfairDisplay'
  },
  bar: {
    height: StatusBar.currentHeight,
  },
  icon: {
    fontSize: 100,
  },
  iconText: {
    position: 'absolute',
    top: 15
  }
});
