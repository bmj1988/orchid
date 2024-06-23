import { StyleSheet, TextInput, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'
import { useRef, useState } from 'react'


const SearchBar = () => {
    const [search, setSearch] = useState('')
    const searchRef = useRef()

    const onSearch = () => {
        console.log(search)
    }

    const onPress = () => {
        searchRef.current.focus()
    }

    return (
        <Pressable style={styles.container} onPress={() => onPress()}>
            <Icon name='search' size={25} color={tulipColors.tulipBlack} />
            <TextInput ref={searchRef} value={search} maxLength={40} onChangeText={text => setSearch(text)} onSubmitEditing={() => onSearch()} color={tulipColors.tulipWhite} />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderColor: tulipColors.tulipBlack,
        borderWidth: 1,
        borderStyle: 'solid',
        width: 280
    },
})

export default SearchBar
