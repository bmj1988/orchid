import { useDispatch } from 'react-redux'
import { ColorDropDownOptions } from "@/constants/Colors";
import styles from './_styles'
import { useState } from 'react';
import { thunkCreateWall } from '../../store/wall';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import Icon from 'react-native-vector-icons/Ionicons'
import { BasicRoundButton } from '../buttons/BasicRoundButton';

export default function AddWallModal({ isVisible, onClose }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [shared, setShared] = useState(false)
    const [userList, setUserList] = useState([])
    const [color, setColor] = useState(null)
    const [access, setAccess] = useState("public")
    const [errors, setErrors] = useState({})
    const [dropdownFocus, setDropdownFocus] = useState(false)


    const createWall = async () => {
        const newWall = {
            access,
            name,
            userList,
            color
        }
        await dispatch(thunkCreateWall(newWall))
    }

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <ScrollView contentContainerStyle={styles.modalContainer}>
                <View>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                    <View style={styles.textView}>
                        <Text style={styles.text}>{"Name"}</Text>
                        <TextInput style={styles.inputs} value={name} onChangeText={setName}></TextInput>
                    </View>
                    <View style={styles.iconRow}>
                        <View styles={styles.iconView}>
                            {/* Refactor these into single component WallOptionsPublicPrivate */}
                            {access === "public" && <Pressable onPress={() => setAccess("private")}>
                                <Icon name={"lock-open-outline"} style={styles.icon} size={25} />
                            </Pressable>}
                            {access === "private" && <Pressable onPress={() => setAccess("public")}>
                                <Icon name={"lock-closed"} size={25} style={styles.icon} />
                            </Pressable>}
                            <View style={styles.iconLabel}>
                            <Text style={{textAlign: "left", textAlignVertical: "center"}}>{access}</Text>
                            </View>
                        </View>
                        <View style={styles.iconView}>
                            <View>
                            {!shared && <Pressable onPress={() => setShared(!shared)}>
                                <Icon name={"people-outline"} style={styles.icon} size={30} />
                            </Pressable>}
                            {shared && <Pressable onPress={() => setShared(!shared)}>
                                <Icon name={"people"} style={styles.icon} size={30} />
                            </Pressable>}
                            </View>
                            <View style={styles.iconLabel}>
                            <Text style={{textAlign: "center", textAlignVertical: "center"}}>{shared ? "shared" : ""}</Text>
                            </View>
                        </View>

                        <Dropdown
                            data={ColorDropDownOptions}
                            value={color}
                            style={[styles.dropdown, { backgroundColor: color }]}
                            placeholderStyle={styles.placeholderStyle}
                            placeholder='Color'
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
                    <BasicRoundButton onPress={() => createWall()} icon={"add"} />
                </View>
            </ScrollView>
        </Modal>
    )
}
