import Icon from 'react-native-vector-icons/Ionicons'
import { View, Pressable, Text } from 'react-native'
import { useEffect } from 'react'

const UsersList = ({ userList, setUserList, friends, setErrors }) => {

    const removeUser = (username) => {
        setUserList(userList.filter((user) => user.username !== username))
        return
    }

    if (userList.length === 0) return

    return (
        <View>
            {userList.map((user) => {
                return (<View style={{ display: 'flex', flexDirection: 'row', gap: 10 }} key={user.username}>
                    <Text>{user.username}</Text>
                    <Pressable onPress={() => removeUser(user.username)}>
                        <Icon name={'person-remove'} size={18} />
                    </Pressable>
                </View>)
            })}
        </View>
    )
}

export default UsersList;
