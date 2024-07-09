import { useDispatch } from 'react-redux'
import { ColorDropDownOptions } from "@/constants/Colors";
import styles from '../_styles'
import { useState } from 'react';
import { thunkCreateWall } from '../../../store/wall';
import { Modal, ScrollView, Text, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import { BasicRoundButton } from '../../buttons/BasicRoundButton';
import NameInput from './NameInput';
import AccessSelector from './AccessSelector'
import SharedSelector from './SharedSelector';
import UsersList from './UsersList';
import UserSearch from './UserSearch';

export default function AddWallModal({ isVisible, onClose }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [shared, setShared] = useState(false)
    const [userList, setUserList] = useState([])
    const [color, setColor] = useState(null)
    const [access, setAccess] = useState("public")
    const [errors, setErrors] = useState({})
    const [userSearch, setUserSearch] = useState("")
    const [dropdownFocus, setDropdownFocus] = useState(false)
    const [acData, setAcData] = useState([])
    const [friends, setFriends] = useState([])

    const createWall = async () => {
        const usersArray = []
        for (let user of userList) {
            usersArray.push({ id: user.id })
        }

        console.log(usersArray)
        const newWall = {
            access,
            name,
            usersArray,
            color
        }
        await dispatch(thunkCreateWall(newWall))
        setName("")
        setAccess("public")
        setColor(null)
        setErrors({})
        setShared(false)
        setUserList([])
        setUserSearch("")
        setAcData([])
        onClose()
    }

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <ScrollView contentContainerStyle={styles.newWallModalContainer} keyboardShouldPersistTaps="always">
                <View>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                    <NameInput styles={styles} name={name} setName={setName} />
                    <View style={styles.iconRow}>
                        <AccessSelector styles={styles} setAccess={setAccess} access={access} />
                        <SharedSelector friends={friends} setFriends={setFriends} setUserSearch={setUserSearch} setAcData={setAcData} styles={styles} shared={shared} setShared={setShared} />
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
                {shared &&
                    <View style={styles.iconView}>
                        <View style={styles.lineBreak}></View>
                        <Text>{'Add up to 5 friends'}</Text>
                        <UserSearch errors={errors} friends={friends} setAcData={setAcData} acData={acData} userSearch={userSearch} setUserSearch={setUserSearch} userList={userList} setUserList={setUserList} setErrors={setErrors} />
                        <UsersList setErrors={setErrors} friends={friends} userList={userList} setUserList={setUserList} />
                    </View>}
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={() => {
                        onClose()
                        setName("")
                        setAccess("public")
                        setColor(null)
                        setErrors({})
                        setShared(false)
                        setUserList([])
                        setUserSearch("")
                        setAcData([])
                    }}
                        icon={"close"} />
                    <BasicRoundButton onPress={() => createWall()} icon={"add"} />
                </View>
            </ScrollView>
        </Modal>
    )
}


{/* AUTOCOMPLETE VIA LIBRARY <View style={styles.autocompleteContainer}>
<AutocompleteInput
    data={acdata}
    value={userToAdd}
    onChangeText={(text) => setUserToAdd(text)}
    hideResults={userToAdd.length < 1 ? true : false}
    flatListProps={{
        keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => <Text>{item.name}</Text>
    }}
/>
</View> */}
