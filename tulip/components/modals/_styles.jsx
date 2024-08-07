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
        borderWidth: 2,
        borderColor: tulipColors.tulipBlack,
        padding: 20,
        bottom: 0,
        elevation: 5,
    },
    newWallModalContainer: {
        flexDirection: 'column',
        height: '60%',
        width: '100%',
        backgroundColor: tulipColors.tulipWhite,
        position: "absolute",
        justifyContent: 'space-between',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: tulipColors.tulipBlack,
        padding: 20,
        bottom: 0,
        elevation: 5,
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
    },
    lineBreak: {
        height: 1,
        width: '75%',
        backgroundColor: tulipColors.tulipBlack,
        marginBottom: 20,
        marginTop: 20
    },
    autocompleteContainer: {
        position: 'absolute',
        flex: 1,
        zIndex: 1,
        right: 1,
        width: 150,
        borderWidth: 1,
        borderColor: tulipColors.tulipBlack,
        backgroundColor: tulipColors.tulipBlue,
        padding: 2,
        borderRadius: 5
    },
    addUserContainer: {
        position: 'absolute',
        zIndex: 1,
        height: 175,
        width: "fit-content",
        borderWidth: 1,
        borderColor: tulipColors.tulipBlack,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        left: 75,
        borderRadius: 5,
        backgroundColor: tulipColors.tulipWhite
    }
})
