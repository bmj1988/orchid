import QuoteNote from "@/components/QuoteNote";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router'
import { thunkWallById } from "@/store/wall";
import { tulipColors } from "@/constants/Colors";
import AddQuoteModal from '@/components/modals/AddQuoteModal'
import { BasicRoundButton } from "@/components/buttons/BasicRoundButton";
import WallIconQuote from "@/components/buttons/WallButtons/WallIconQuote";
const Wall = () => {
    const dispatch = useDispatch()
    const { wallId } = useLocalSearchParams()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        dispatch(thunkWallById(wallId))
    }, [wallId])
    const wall = useSelector((state) => state.walls[wallId])

    return (
        <View style={styles.wallContainer}>
            <Text style={styles.wallName}>{wall.name.toUpperCase()}</Text>
            <ScrollView contentContainerStyle={styles.scroller}>
                {wall.quotes && wall.quotes.map((quote) => {
                    return (
                        <WallIconQuote quote={quote.content} author={quote.author} key={quote.id} />
                    )
                })}
            </ScrollView>
            <AddQuoteModal isVisible={modalVisible} onClose={() => setModalVisible(false)} wallId={wallId} />
            <BasicRoundButton onPress={() => setModalVisible(true)} icon={"add"} />
        </View>
    )
}

const styles = StyleSheet.create({
    wallContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: tulipColors.orchidEggshell
    },
    wallName: {
        fontSize: 40,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'PlayfairDisplay'
    },
    scroller: {
        overflow: "scroll",
        flexDirection: 'row',
        width: 400,
        flexWrap: "wrap",
        gap: 20,
        justifyContent: 'center'
    }
})

export default Wall
