import QuoteNote from "@/components/QuoteNote";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router'
import { thunkWallById } from "@/store/wall";
import { orchidColors } from "@/constants/Colors";
import AddQuoteModal from '@/components/modals/AddQuoteModal'
import { BasicRoundButton } from "@/components/buttons/WallButtons/BasicRoundButton";
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
            <Text style={styles.wallName}>{wall.name}</Text>
            <ScrollView contentContainerStyle={styles.scroller}>
                {wall.quotes && wall.quotes.map((quote) => {
                    return (
                        <QuoteNote quote={quote.content} author={quote.author} color={orchidColors.orchidLavender} key={quote.id} />
                    )
                })}
            </ScrollView>
            <AddQuoteModal isVisible={modalVisible} onClose={() => setModalVisible(false)} wallId={wallId} />
            <BasicRoundButton onPress={() => setModalVisible(true)} icon={"leaf"} />
        </View>
    )
}

const styles = StyleSheet.create({
    wallContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: orchidColors.orchidEggshell
    },
    wallName: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    scroller: {
        overflow: "scroll"
    }
})

export default Wall
