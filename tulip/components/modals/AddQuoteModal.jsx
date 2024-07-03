import { useState } from "react";
import { Modal, View, Text, TextInput } from "react-native";
import { BasicRoundButton } from "../buttons/BasicRoundButton";
import { useDispatch } from "react-redux";
import { thunkAddQuote } from "@/store/quotes";
import styles from './_styles'

export default function AddQuote({ isVisible, onClose, wallId }) {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState('')
    const [quote, setQuote] = useState('')
    const [errors, setErrors] = useState({})

    const AddQuoteToWall = async () => {
        if (!author) setErrors({...errors, Author: "No Author Provided"})
        if (!quote) setErrors({...errors, Quote: "No Quote Provided"})
        if (Object.values(errors).length) return
        const newQuote = {
            author,
            content: quote,
            wallId: Number(wallId)
        }

        await dispatch(thunkAddQuote(newQuote))
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
                        <TextInput multiline={true} style={styles.inputs} onChangeText={setQuote}></TextInput>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={onClose} icon={"close"} />
                    <BasicRoundButton onPress={() => AddQuoteToWall()} icon={"add"} />
                </View>
            </View>
        </Modal>
    )
}
