import { Pressable, Text, View } from 'react-native'
import styles from '../_styles'

const AutoCompleteList = ({ acdata, setUserSearch, userSearch }) => {

    return (
        <View style={userSearch && acdata.length > 0 ? styles.autocompleteContainer : ""}>
            {userSearch && acdata.map((user) => {
                return (<Pressable onPress={() => setUserSearch(user.username)} key={user.id}>
                    <Text>{user.username}</Text>
                </Pressable>)
            })}
        </View>
    )
}

export default AutoCompleteList
