import { Button, SafeAreaView, StyleSheet, TextInput } from "react-native"
import { tulipColors } from '@/constants/Colors'



const SupportPage = () => {
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const submit = () => {
        console.log("Submit click")
        setMessage("")
        setSubmitted(true)
    }

    return (
        <SafeAreaView>
            <View>
                <Image style={styles.img} source={{ uri: 'https://i.gyazo.com/7be89f6a141b3e4f37b2c9608ca0fcb9.png' }} />
                <Text>
                    {"Tulip values the experience of its users. If you need support with any aspect of our platform, feel free to leave us a message below."}
                </Text>
                {!submitted && <View>
                    <TextInput
                        numberOfLines={4}
                        onChangeText={text => setMessage(text)}
                        value={message}
                    />
                    <Button
                        title={"Submit"}
                        onPress={() => submit()}
                    />
                </View>}
                {submitted && <Text>{'Message submitted'}</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    view: {

    },
    text: {
        color: tulipColors.tulipBlack
    },
    button: {

    },
    img: {
        height: 100
    }
})

export default SupportPage
