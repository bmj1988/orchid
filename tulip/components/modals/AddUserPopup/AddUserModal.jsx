import { useEffect, useState } from 'react'
import styles from '../_styles'
import UserSearch from '../AddWallModal/UserSearch'
import { View, Text, Pressable } from 'react-native'
import { BasicRoundButton } from '../../buttons/BasicRoundButton';
import { thunkEditWall } from '@/store/wall'
import { csrfFetch } from '@/store/csrfFetch';
import { useDispatch } from 'react-redux';
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL



const AddUserModal = ({ wallName, wallId, onClose }) => {
    const dispatch = useDispatch()
    const [userSearch, setUserSearch] = useState("")
    const [friends, setFriends] = useState([])
    const [userList, setUserList] = useState([])
    const [acData, setAcData] = useState([])
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await csrfFetch(`${URL}/api/users/friends`)
            const userFriends = await response.json();
            setAcData(userFriends)
            setFriends(userFriends)
        }
        if (friends.length === 0) fetchFriends()
    }, [])

    const addUserToWall = async () => {
        const addInfo = {
            userId: userList[0].id,
            wallId
        }
        console.log(addInfo)
        const response = await dispatch(thunkEditWall(addInfo))
        if (response) {
            setSuccess(true)
        }
        else {
            setSuccess(false)
        }
    }

    const close = () => {
        setUserSearch("")
        setFriends([])
        setUserList([])
        setAcData([])
        setErrors({})
        onClose()
    }

    return (
        <View style={styles.addUserContainer}>
            <Text style={{fontSize: 20}}>{`Add user to ${wallName}`}</Text>
            {userList.length < 1 && <><UserSearch userSearch={userSearch} setUserSearch={setUserSearch} userList={userList} setUserList={setUserList} errors={errors} setErrors={setErrors} acData={acData} setAcData={setAcData} friends={friends} />
                <BasicRoundButton onPress={() => close()} icon={"close"} /></>}
            {userList.length === 1 && success === null && <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>{userList[0].username}</Text>
                <Text>{'Add this user?'}</Text>
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={() => close()} icon={"close"} />
                    <BasicRoundButton onPress={() => addUserToWall()} icon={"person-add"} />
                </View>
            </View>}
            {success === true && <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                <Text>{`${userList[0].username} added to ${wallName}`}</Text>
                <Pressable onPress={() => close()}>
                    <Text style={{textDecorationStyle: "solid", textDecorationColor: "black", textDecorationLine: "underline"}}>{`close`}</Text>
                </Pressable>
            </View>
            }
            {success === false && <View>
                <Text>{`An error occurred while trying to add ${userList[0].username} to ${wallName}`}</Text>
                <Pressable onPress={() => close()}>
                    <Text style={{textDecorationStyle: "solid", textDecorationColor: "black", textDecorationLine: "underline"}}>{`close`}</Text>
                </Pressable>
            </View>
            }
        </View>
    )
}

export default AddUserModal
