import { Text, TextInput, View } from "react-native";

const NameInput = ({ styles, name, setName }) => {

    return (<View style={styles.textView}>
        <Text style={styles.text}>{"Name"}</Text>
        <TextInput style={styles.inputs} value={name} onChangeText={setName}></TextInput>
    </View>)
}

export default NameInput;
