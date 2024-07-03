import { StyleSheet, Text, ScrollView, View } from 'react-native';
import WallForm from '@/components/WallForm';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserWalls, wallsArray } from '../../store/wall'
import { tulipColors } from '@/constants/Colors';
import { BasicRoundButton } from '@/components/buttons/BasicRoundButton';

export default function WallScreen() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserWalls())
  }, [])
  const walls = useSelector(wallsArray)

  const newWall = () => {
    console.log('new wall')
  }

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.logo}>{'GALLERY'}</Text>
      <ScrollView contentContainerStyle={styles.wallContainer}>
        {walls.length > 0 && walls.map((wall) => {
          return (
            <WallForm color={tulipColors.orchidLavender} wall={wall} key={wall.id} />
          )
        })}
      </ScrollView>
      <BasicRoundButton onPress={() => newWall()} icon={'add'} />
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
    backgroundColor: tulipColors.orchidEggshell,
    marginTop: StatusBar.currentHeight,
    marginBottom: 35,
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
  icon: {
    fontSize: 100,
  },
  iconText: {
    position: 'absolute',
    top: 15
  }
});
