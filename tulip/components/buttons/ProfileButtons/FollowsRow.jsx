import { View, Text, StyleSheet } from 'react-native'


const FollowsRow = ({ follows, followers }) => {
    return (
        <View style={styles.container}>
            <View style={styles.followView}>
                <Text style={styles.numbers}>{followers}</Text>
                <Text style={styles.letters}>{"Followers"}</Text>
            </View>
            <View style={styles.followView}>
                <Text style={styles.numbers}>{follows}</Text>
                <Text style={styles.letters}>{"Following"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        width: "80%",
    },
    followView: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    numbers: {
        fontSize: 20,
    },
    letters: {
        fontSize: 14
    }
})

export default FollowsRow
