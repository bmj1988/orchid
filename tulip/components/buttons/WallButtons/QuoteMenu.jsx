import { StyleSheet, View } from "react-native"
import MenuItem from "../MenuItem"
import { tulipColors } from "@/constants/Colors"

const QuoteMenu = ({ setVisible }) => {
    return (
        <View style={styles.container}>
            <MenuItem text={'Edit quote'} onPress={() => console.log('click edit')} position={'top'} />
            <MenuItem text={'Delete quote'} onPress={() => console.log('click delete')} position={'center'} />
            <MenuItem text={'Share to wall'} onPress={() => console.log('click share')} position={'center'} />
            <MenuItem text={'Change Color'} onPress={() => console.log('click color')} position={'center'} />
            <MenuItem text={'close'} onPress={() => setVisible()} position={'bottom'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: tulipColors.tulipWhite,
        borderWidth: 1,
        borderColor: tulipColors.tulipBlack,
        borderRadius: 1,
        position: 'absolute',
        bottom: 10,
        zIndex: 2,
        padding: 5
    },
})

export default QuoteMenu
