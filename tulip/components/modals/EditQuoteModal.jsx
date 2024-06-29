import { tulipColors, ColorDropDownOptions } from "@/constants/Colors";
import { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { BasicRoundButton } from "../buttons/BasicRoundButton";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { thunkAddQuoteToWall } from "@/store/wall";

export default function EditQuote({ isVisible, onClose, wallId, content, authoredBy }) {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState(authoredBy)
    const [quote, setQuote] = useState(content)
    const [color, setColor] = useState(null)
    const [dropdownFocus, setDropdownFocus] = useState(false)
    const [errors, setErrors] = useState({})
    console.log(ColorDropDownOptions)

    const EditQuoteToWall = async () => {
        if (!author) errors['author'] = "No Author Provided"
        if (!quote) errors['quote'] = "No Quote Provided"
        if (Object.values(errors).length) return
        const editQuote = {
            author,
            content: quote,
            wallId: Number(wallId)
        }

        // await dispatch(thunkEditQuote(newQuote))
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
                        <TextInput multiline={true} value={quote} style={styles.inputs} onChangeText={setQuote} numberOfLines={4}></TextInput>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Color"}</Text>
                        <Dropdown
                            data={ColorDropDownOptions}
                            value={color}
                            style={[styles.dropdown, {backgroundColor: color}]}
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
                    <BasicRoundButton onPress={() => console.log("delete click")} icon={"trash-bin-outline"} />
                </View>
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flexDirection: 'column',
        height: '40%',
        width: '100%',
        backgroundColor: tulipColors.tulipWhite,
        position: "absolute",
        justifyContent: 'space-between',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: tulipColors.tulipBlack,
        padding: 20,
        bottom: 0,
        elevation: 5
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
        paddingRight: 5,
        borderRadius: 12,
        width: 200,
        marginBottom: 10
    },
    error: {
        fontSize: 16,
        color: "red"
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 100,
    },
    ddContainer: {
        backgroundColor: tulipColors.tulipWhite
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
})
