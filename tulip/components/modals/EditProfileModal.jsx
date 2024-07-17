import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, View, Text, TextInput, ScrollView } from "react-native";
import styles from './_styles'
import AccessSelector from "./AddWallModal/AccessSelector"
import { thunkEditProfile } from "@/store/session"
import { BasicRoundButton } from '@/components/buttons/BasicRoundButton';


export default function EditProfile({ isVisible, onClose, userBio, userAccess }) {
    const dispatch = useDispatch();
    const [bio, setBio] = useState(userBio)
    const [access, setAccess] = useState(userAccess)
    const [errors, setErrors] = useState({})


    const editProfile = async () => {
        const profileEdit = {
            bio,
            access
        }
        const result = await dispatch(thunkEditProfile(profileEdit))
        if (result.errors) {
            setErrors(result.errors)
        }
        else onClose()
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps="always">
                <View>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error) => {
                        return (
                            <Text style={styles.error}>{error}</Text>
                        )
                    })}
                </View>
                <AccessSelector styles={styles} setAccess={setAccess} access={access} />
                <View style={styles.textView}>
                    <Text style={styles.text}>{"Bio"}</Text>
                    <TextInput multiline={true} style={styles.inputs} onChangeText={setBio} value={bio}></TextInput>
                </View>
                <View style={styles.buttonView}>
                    <BasicRoundButton onPress={() => {
                        setBio(userBio)
                        setAccess(userAccess)
                        onClose()
                    }}
                        icon={"close"} />
                    <BasicRoundButton onPress={() => editProfile()} icon={"save-outline"} />
                </View>
            </ScrollView>
        </Modal>
    )
}
