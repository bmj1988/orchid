import { Button, SafeAreaView, StatusBar, StyleSheet, TextInput } from "react-native"
import { tulipColors } from "@/constants/Colors";



const SupportPage = () => {
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const submit = () => {
        console.log("Submit click")
        setMessage("")
        setSubmitted(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image style={styles.img} source={{ uri: 'https://i.gyazo.com/7be89f6a141b3e4f37b2c9608ca0fcb9.png' }} />
                <Text style={styles.text}>
                    {"Tulip values the experience of its users. If you need support with any aspect of our platform, feel free to leave us a message below."}
                </Text>
                {!submitted && <View style={styles.view}>
                    <TextInput
                        numberOfLines={4}
                        onChangeText={text => setMessage(text)}
                        value={message}
                    />
                    <Button
                        title={"Submit"}
                        color={tulipColors.tulipBlue}
                        onPress={() => submit()}
                    />
                </View>}
                {submitted && <Text style={styles.text}>{'Message submitted'}</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        paddingTop: StatusBar.currentHeight,

    },
    view: {
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: tulipColors.tulipBlack
    },
    button: {
        width: 200,
        height: 30,
        borderRadius: 8
    },
    img: {
        height: 100
    }
})

export default SupportPage
