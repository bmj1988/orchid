import { useState } from "react";
import { Modal, View, Text, TextInput } from "react-native";
import { BasicRoundButton } from "../buttons/BasicRoundButton";
import { useDispatch } from "react-redux";
import { thunkAddQuote } from "@/store/quotes";
import { Dropdown } from "react-native-element-dropdown";
import styles from './_styles'
import { ColorDropDownOptions } from "@/constants/Colors";


export default function AddQuote({ isVisible, onClose, wallId }) {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({})
    const [color, setColor] = useState(null)
    const [dropdownFocus, setDropdownFocus] = useState(false)

    const AddQuoteToWall = async () => {
        if (!author) setErrors({ ...errors, Author: "No Author Provided" })
        if (!content) setErrors({ ...errors, Quote: "No Quote Provided" })
        if (Object.values(errors).length) return
        const newQuote = {
            author,
            content,
            color,
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
                        <TextInput multiline={true} style={styles.inputs} onChangeText={setContent}></TextInput>
                    </View>

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
                        placeholder={"Color"}
                        maxHeight={300}
                        labelField={'label'}
                        valueField={'value'}
                        onChange={item => {
                            setColor(item.value);
                            setDropdownFocus(false)
                        }}
                    />
                </View>
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={onClose} icon={"close"} />
                    <BasicRoundButton onPress={() => AddQuoteToWall()} icon={"add"} />
                </View>
            </View>
        </Modal>
    )
}
