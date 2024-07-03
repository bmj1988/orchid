import { ColorDropDownOptions } from "@/constants/Colors";
import { useState } from "react";
import { Modal, View, Text, TextInput, ScrollView } from "react-native";
import { BasicRoundButton } from "../buttons/BasicRoundButton";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { thunkDeleteQuote, thunkEditQuote } from "@/store/quotes";
import styles from './_styles'


export default function EditQuote({ isVisible, onClose, quote }) {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState(quote.author)
    const [content, setContent] = useState(quote.content)
    const [color, setColor] = useState(null)
    const [dropdownFocus, setDropdownFocus] = useState(false)
    const [errors, setErrors] = useState({})

    const EditQuoteToWall = async () => {
        if (!author) errors['author'] = "No Author Provided"
        if (!content) errors['quote'] = "No Quote Provided"
        if (Object.values(errors).length) return
        const editedQuote = {
            id: quote.id,
            author,
            content,
            wallId: quote.wallId
        }
        await dispatch(thunkEditQuote(editedQuote))
        onClose()

    }

    const DeleteQuoteFromWall = async (id) => {
        await dispatch(thunkDeleteQuote(id))
        onClose()
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <ScrollView contentContainerStyle={styles.modalContainer}>
                <View>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Author"}</Text>
                        <TextInput style={styles.inputs} value={author} onChangeText={setAuthor}></TextInput>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Quote"}</Text>
                        <TextInput multiline={true} value={content} style={styles.inputs} onChangeText={setContent} numberOfLines={4}></TextInput>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Color"}</Text>
                        <Dropdown
                            data={ColorDropDownOptions}
                            value={color}
                            style={[styles.dropdown, { backgroundColor: color }]}
                            placeholderStyle={styles.placeholderStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            containerStyle={styles.ddContainer}
                            activeColor={color}
                            onFocus={() => setDropdownFocus(true)}
                            maxHeight={300}
                            labelField={'label'}
                            valueField={'value'}
                            onChange={item => {
                                setColor(item.value);
                                setDropdownFocus(false)
                            }}
                        />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={onClose} icon={"close"} />
                    <BasicRoundButton onPress={() => EditQuoteToWall()} icon={"save-outline"} />
                    <BasicRoundButton onPress={() => DeleteQuoteFromWall(quote.id)} icon={"trash-bin-outline"} />
                </View>
            </ScrollView>
        </Modal>
    )
}
