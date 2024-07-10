import { useDispatch } from 'react-redux'
import { ColorDropDownOptions } from "@/constants/Colors";
import styles from '../_styles'
import { useState } from 'react';
import { thunkEditWall } from '@/store/wall';
import { Modal, ScrollView, Text, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import { BasicRoundButton } from '../../buttons/BasicRoundButton';
import NameInput from '../AddWallModal/NameInput';
import AccessSelector from '../AddWallModal/AccessSelector'

const EditWallModal = ({ wall, isVisible, onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(wall.name)
    const [color, setColor] = useState(wall.color)
    const [access, setAccess] = useState(wall.access)
    const [errors, setErrors] = useState({})
    const [dropdownFocus, setDropdownFocus] = useState(false)


    const editWall = async () => {
        const newWall = {
            access,
            name,
            color,
            wallId: wall.id

        }
        await dispatch(thunkEditWall(newWall))
        setName("")
        setAccess("public")
        setColor(null)
        setErrors({})
        onClose()
    }

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps="always">
                <View>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                    <NameInput styles={styles} name={name} setName={setName} />
                    <View style={styles.iconRow}>
                        <AccessSelector styles={styles} setAccess={setAccess} access={access} />
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
                    <BasicRoundButton onPress={() => {
                        setName("")
                        setAccess("public")
                        setColor(null)
                        setErrors({})
                        onClose()
                    }}
                        icon={"close"} />
                    <BasicRoundButton onPress={() => editWall()} icon={"save-outline"} />
                </View>
            </ScrollView>
        </Modal>
    )
}

export default EditWallModal;
