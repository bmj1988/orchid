import { tulipColors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
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
    iconView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',


    },
    iconRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 10,
    },
    icon: {
        color: tulipColors.tulipBlack
    },
    iconLabel: {
        position: 'fixed',
        width: 80,

    }
})
