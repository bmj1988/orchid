import { useEffect, useState } from "react";
import { Modal, View, Text, TextInput } from "react-native";
import { BasicRoundButton } from "../buttons/BasicRoundButton";
import { useDispatch } from "react-redux";
import { thunkAddQuote } from "@/store/quotes";
import { Dropdown } from "react-native-element-dropdown";
import styles from './_styles'
import { ColorDropDownOptions } from "@/constants/Colors";
import { csrfFetch } from "../../store/csrfFetch";
const url = process.env.EXPO_PUBLIC_LOCAL_TUNNEL


export default function SaveQuote({ isVisible, onClose, quote }) {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState(quote.author)
    const [content, setContent] = useState(quote.content)
    const [errors, setErrors] = useState({})
    const [color, setColor] = useState(quote.color)
    const [wallId, setWallId] = useState(null)
    const [walls, setWalls] = useState([])
    const [dropdownFocus, setDropdownFocus] = useState(false)

    useEffect(() => {
        const getWalls = async () => {
            const response = await csrfFetch(`${url}/api/walls/list`)
            const list = await response.json()
            setWalls(list)
        }
        getWalls()
    }, [])

    const AddQuoteToWall = async () => {
        if (!author) setErrors({ ...errors, Author: "No Author Provided" })
        if (!content) setErrors({ ...errors, Quote: "No Quote Provided" })
        if (!wallId) setErrors({ ...errors, Quote: "No Quote Provided" })

        if (Object.values(errors).length) return
        const newQuote = {
            author,
            content,
            color,
            wallId
        }

        await dispatch(thunkAddQuote(newQuote))
        console.log(wallId)
        onClose()

    }
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.newWallModalContainer}>
                <View>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Author"}</Text>
                        <TextInput style={styles.inputs} onChangeText={setAuthor} placeholder={quote.author} />
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Quote"}</Text>
                        <TextInput multiline={true} style={styles.inputs} onChangeText={setContent} placeholder={quote.content} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
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

                        <Dropdown
                            data={walls}
                            value={wallId}
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            containerStyle={styles.ddContainer}
                            placeholder={"Choose a wall"}
                            labelField={'name'}
                            valueField={'id'}
                            onFocus={() => setDropdownFocus(true)}
                            maxHeight={200}
                            onChange={item => {
                                setWallId(item.id)
                                setDropdownFocus(false)
                            }}
                        />
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
