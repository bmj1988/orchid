import { orchidColors } from "@/constants/Colors";
import { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet } from "react-native";
import { BasicRoundButton } from "../buttons/WallButtons/BasicRoundButton";
import { useDispatch } from "react-redux";
import { thunkAddQuoteToWall } from "@/store/wall";

export default function AddQuote({ isVisible, onClose, wallId }) {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState('')
    const [quote, setQuote] = useState('')
    const [errors, setErrors] = useState({})

    const AddQuoteToWall = async () => {
        if (!author) errors['author'] = "No Author Provided"
        if (!quote) errors['quote'] = "No Quote Provided"
        if (Object.values(errors).length) return
        const newQuote = {
            author,
            content: quote,
            wallId: Number(wallId)
        }

        await dispatch(thunkAddQuoteToWall(newQuote))
        onClose()

    }
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContainer}>
                <View>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Author"}</Text>
                        <TextInput style={styles.inputs} onChangeText={setAuthor}></TextInput>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Quote"}</Text>
                        <TextInput style={styles.inputs} onChangeText={setQuote}></TextInput>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={onClose} icon={"close"} />
                    <BasicRoundButton onPress={() => AddQuoteToWall()} icon={"leaf"} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flexDirection: 'column',
        height: '50%',
        width: '100%',
        backgroundColor: orchidColors.orchidMint,
        position: "absolute",
        justifyContent: 'space-between',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        padding: 20,
        bottom: 0
    },
    textView: {
        flexDirection: 'row',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 20,
        marginRight: 20,
    },
    inputs: {
        backgroundColor: "#EEEEEE",
        fontSize: 16,
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    error: {
        fontSize: 16,
        color: "red"
    }
})
