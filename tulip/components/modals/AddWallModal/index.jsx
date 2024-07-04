import { useDispatch } from 'react-redux'
import { ColorDropDownOptions } from "@/constants/Colors";
import styles from '../_styles'
import { useState } from 'react';
import { thunkCreateWall } from '../../../store/wall';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import Icon from 'react-native-vector-icons/Ionicons'
import { BasicRoundButton } from '../../buttons/BasicRoundButton';
import { csrfFetch } from '@/store/csrfFetch';
import NameInput from './nameInput';

export default function AddWallModal({ isVisible, onClose }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [shared, setShared] = useState(false)
    const [userList, setUserList] = useState([])
    const [color, setColor] = useState(null)
    const [access, setAccess] = useState("public")
    const [errors, setErrors] = useState({})
    const [userSearch, setUserSearch] = useState("")
    const [userToAdd, setUserToAdd] = useState({})
    const [dropdownFocus, setDropdownFocus] = useState(false)
    const [acData, setAcData] = useState([])

    let followers;
    const fetchFollowers = async () => {
        followers = await csrfFetch()
        setAcData(followers)
    }

    const filterFollowers = () => {
        let ac = followers.filter((follower) => follower.username.toLowerCase().includes(userSearch.toLowerCase()))
        setAcData(ac)
    }

    const addUser = () => {
        if (userList.length > 4) {
            setErrors({...errors, maxUsers: "Cannot start a shared wall with more than 5 users"})
            return
        }
        user = {
            username: userSearch
        }
        setUserList([...userList, user])
        setUserSearch("")
    }

    const removeUser = (username) => {
        setUserList(userList.filter((user) => user.username !== username))
    }

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
            <ScrollView contentContainerStyle={styles.newWallModalContainer} keyboardShouldPersistTaps="always">
                <View>
                    {/* ERRORS */}
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                    {/* NAME INPUT */}
                    <NameInput styles={styles} name={name} setName={setName}/>
                    {/* ACCESS SELECTOR */}
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
                                <Text style={{ textAlign: "left", textAlignVertical: "center" }}>{access}</Text>
                            </View>
                        </View>
                        {/* SHARED SELECTOR */}
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
                                <Text style={{ textAlign: "center", textAlignVertical: "center" }}>{shared ? "shared" : ""}</Text>
                            </View>
                        </View>
                        {/* DROPDOWN */}
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
                {/* SHARED USER SET */}
                {shared &&
                    <View style={styles.iconView}>
                        <View style={styles.lineBreak}></View>
                        <Text>{'Add up to 5 friends'}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                            <TextInput value={userSearch}
                                onChangeText={setUserSearch}
                                placeholder="Search your friends' usernames" />
                            <Pressable onPress={() => addUser()}>
                                <Icon name={"person-add"} size={25} />
                            </Pressable>
                        </View>
                        {userList.length > 0 && <View>
                            {userList.map((user) => {
                                return (<View style={{ display: 'flex', flexDirection: 'row', gap: 10 }} key={user.username}>
                                    <Text>{user.username}</Text>
                                    <Pressable onPress={() => removeUser(user.username)}>
                                        <Icon name={'person-remove'} size={18} />
                                    </Pressable>
                                </View>)
                            })}
                        </View>}
                    </View>}
                    {/* BUTTONS */}
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={onClose} icon={"close"} />
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
