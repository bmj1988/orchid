import Icon from 'react-native-vector-icons/Ionicons'
import { View, Pressable, TextInput } from 'react-native'
import AutoCompleteList from './AutoCompleteList'


const UserSearch = ({ userSearch, setUserSearch, userList, setUserList, setErrors, acData, setAcData, friends, errors }) => {

    const filterFollowers = (text) => {
        let ac = friends.filter((follower) => follower.username.toLowerCase().includes(text.toLowerCase()))
        setAcData(ac)
    }

    const addUser = () => {
        if (userSearch.length < 1) {
            return
        }
        if (userList.length > 4) {
            setErrors({ ...errors, maxUsers: "Cannot start a shared wall with more than 5 users" })
            return
        }
        const user = {
            username: userSearch
        }
        for (let addedUser of userList) {
            if (addedUser.username == user.username) {
                setErrors({ ...errors, AlreadyInList: "Cannot add a user twice" })
                return
            }
        }
        if (errors['AlreadyInList']) delete errors['AlreadyInList']
        for (let friend of friends) {
            if (friend.username == user.username) {
                delete errors['NotAFriend']
                setUserList([...userList, friend])
                setUserSearch("")
                setAcData(friends)
                return
            }
        }
        setErrors({...errors, NotAFriend: "Cannot add non-friends to Shared Wall"})
        setAcData(friends)
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <TextInput value={userSearch}
                    onChangeText={(text) => {
                        setUserSearch(text)
                        filterFollowers(text)
                    }}
                    placeholder="Search your friends' usernames" />
                <View>
                    <AutoCompleteList userSearch={userSearch.length >= 1 ? true : false} acdata={acData} setUserSearch={setUserSearch} />
                </View>
            </View>
            <Pressable onPress={() => addUser()}>
                <Icon name={"person-add"} size={25} />
            </Pressable>
        </View>
    )
}

export default UserSearch;
