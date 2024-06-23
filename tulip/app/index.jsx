import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { thunkLogin } from '../store/session'
import { csrfFetch } from '@/store/csrfFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tulipColors } from '@/constants/Colors';

const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL
const name = "Tulip "

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const login = async (e) => {
    e.preventDefault()
    const credentials = {
      email,
      password
    }
    try {
      const response = await dispatch(thunkLogin(credentials))
      console.log(response)
      router.replace('(tabs)')

    }
    catch (e) {
      console.log(e)
    }

  }

  const generateCSRF = async (e) => {
    e.preventDefault()
    const response = await csrfFetch(`${URL}/api/csrf/restore`)
    if (response.ok) {
      let token = response.headers.get('set-cookie')
      token = token.slice(11, 47)
      await AsyncStorage.setItem('XSRF-TOKEN', token)
      // console.log(token)
      const XSRF = await AsyncStorage.getItem('XSRF-TOKEN')
      console.log(XSRF)
    }
  }

  const demoLogin = async (e) => {
    e.preventDefault()
    const credentials = {
      email: 'demo@orchid.io',
      password: 'password'
    }
    try {
      const response = await dispatch(thunkLogin(credentials))
      console.log(response)
      router.replace('(tabs)')

    }
    catch (e) {
      console.log(e)
    }

  }

  return (
    <SafeAreaView style={styles.titleContainer}>
      <View style={styles.logoView}>
        <Text style={styles.logo}>{name}</Text>
        <Image style={styles.logoTwo} source={{ uri: 'https://i.gyazo.com/7be89f6a141b3e4f37b2c9608ca0fcb9.png' }} />
      </View>
      <View style={styles.buttonContainer}>
        {Object.values(errors).length > 0 && <Text style={styles.errors}>{errors.error}</Text>}
        <TextInput
          value={email}
          onChangeText={setEmail}
          inputMode="email"
          autoComplete='email'
          style={styles.loginInputs} />
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
          autoComplete='current-password'
          style={styles.loginInputs}
        />
        <Button title="Login" onPress={(e) => login(e)} color={tulipColors.orchidLavender} />
        <Button title="Sign up" color={tulipColors.orchidLavender} />
        <Button title="CSRF-Token" onPress={(e) => generateCSRF(e)} color={tulipColors.orchidLavender} />
        <Button title="Demo Login" onPress={(e) => demoLogin(e)} color={tulipColors.orchidLavender} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
    flex: 1,
    backgroundColor: tulipColors.tulipWhite
  },
  logoView: {
    flexDirection: 'row',
    justifyContents: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  buttonContainer: {
    gap: 8,
    marginBottom: 8,
    width: 175
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
    fontSize: 80,
    fontFamily: 'Allison',
  },
  loginInputs: {
    backgroundColor: 'white',
  },
  errors: {
    color: 'red'
  },
  logoTwo: {
    height: 220,
    width: 80,
  }
});
