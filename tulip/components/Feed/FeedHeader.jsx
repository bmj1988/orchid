import { StyleSheet, View, Text } from 'react-native'
import { tulipColors } from '@/constants/Colors'
import SearchBar from './SearchBar'

const FeedHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>
                {'Tulip '}
            </Text>
            <SearchBar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    logoText: {
        fontFamily: 'Allison',
        fontSize: 50,
        fontWeight: '600',
        color: tulipColors.tulipBlack,
    }
})

export default FeedHeader
