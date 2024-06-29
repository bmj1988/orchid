import Icon from 'react-native-vector-icons/FontAwesome'
import { tulipColors } from '@/constants/Colors'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import QuoteMenu from '@/components/buttons/WallButtons/QuoteMenu'
import EditQuote from '@/components/modals/EditQuoteModal'

const WallIconQuote = ({ quote, author }) => {
    const [modalVisible, setModalVisible] = useState(false)


    return (
        <>
            <Pressable onPress={() => console.log('tester')} onLongPress={() => setModalVisible(true)}>
                <Icon name="sticky-note" size={180} color={tulipColors.tulipOrange} />
                <View style={styles.textView}>
                    <Text numberOfLines={4} style={[styles.text, { fontFamily: 'PlayfairDisplay' }]}>{quote}</Text>
                    <Text style={[styles.text, { fontFamily: 'Allison', fontSize: 25 }]}>
                        {author}
                    </Text>
                </View>
                <EditQuote isVisible={modalVisible} onClose={() => setModalVisible(false)} content={quote} authoredBy={author} wallId={1} />
                {/* {visible && <QuoteMenu visible={visible} setVisible={() => setVisible(!visible)} />} */}
            </Pressable>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        position: 'absolute',
        top: 7,
        width: 180,
        padding: 10,
        paddingRight: 30,
    },
    text: {
        color: tulipColors.tulipBlack,
    }

})

export default WallIconQuote;
