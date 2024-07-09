import { View, Pressable, Text } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import { csrfFetch } from '@/store/csrfFetch';

const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

const SharedSelector = ({ styles, shared, setShared, setAcData, setUserSearch, friends, setFriends }) => {

    const fetchFriends = async () => {
        const response = await csrfFetch(`${URL}/api/users/friends`)
        const userFriends = await response.json();
        setAcData(userFriends)
        setFriends(userFriends)
    }

    return (<View style={styles.iconView}>
        <View>
            {!shared && <Pressable onPress={() => {
                setShared(!shared)
                if (!friends.length) {
                    fetchFriends()
                }
            }}>
                <Icon name={"people-outline"} style={styles.icon} size={30} />
            </Pressable>}
            {shared && <Pressable onPress={() => {
                setShared(!shared)
                setUserSearch("")
            }}>
                <Icon name={"people"} style={styles.icon} size={30} />
            </Pressable>}
        </View>
        <View style={styles.iconLabel}>
            <Text style={{ textAlign: "center", textAlignVertical: "center" }}>{shared ? "shared" : ""}</Text>
        </View>
    </View>)
}

export default SharedSelector
