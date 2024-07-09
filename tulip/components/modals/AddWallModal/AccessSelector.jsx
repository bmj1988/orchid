import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, Pressable } from 'react-native'


const AccessSelector = ({ styles, setAccess, access }) => {
    return (
        <View styles={styles.iconView}>
            {access === "public" && <Pressable onPress={() => setAccess("private")}>
                <Icon name={"lock-open-outline"} style={styles.icon} size={25} />
            </Pressable>}
            {access === "private" && <Pressable onPress={() => setAccess("public")}>
                <Icon name={"lock-closed"} size={25} style={styles.icon} />
            </Pressable>}
            <View style={styles.iconLabel}>
                <Text style={{ textAlign: "left", textAlignVertical: "center" }}>{access}</Text>
            </View>
        </View>
    )
}

export default AccessSelector;
