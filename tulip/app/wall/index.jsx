import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router'
import { thunkWallById } from "@/store/wall";
import { tulipColors } from "@/constants/Colors";
import AddQuoteModal from '@/components/modals/AddQuoteModal'
import { BasicRoundButton } from "@/components/buttons/BasicRoundButton";
import WallIconQuote from "@/components/buttons/WallButtons/WallIconQuote";
import HorizontalEllipsis from "@/components/buttons/HorizontalEllipsis";
import WallMenu from "@/components/buttons/WallButtons/WallMenu";
import { quotesArray } from "@/store/quotes";
import AddUserButton from "@/components/buttons/WallButtons/AddUser"
import AddUserModal from "@/components/modals/AddUserPopup/AddUserModal"
import EditWallModal from "@/components/modals/EditWallModal"


const Wall = () => {
    const dispatch = useDispatch()
    const { wallId } = useLocalSearchParams()
    const [modalVisible, setModalVisible] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [addUserVisible, setAddUserVisible] = useState(false)
    const [editWallModal, setEditWallModal] = useState(false)

    useEffect(() => {
        dispatch(thunkWallById(wallId))
    }, [wallId])
    const wall = useSelector((state) => state.walls[wallId])
    const quotes = useSelector(quotesArray)
    console.log('WALL INFO', wall, quotes)

    const shared = wall.group && wall.group.length ? true : false

    return (
        <View style={styles.wallContainer}>
            <View style={shared ? { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10 } : ""}>
                <View style={styles.menuButton}>
                    <HorizontalEllipsis onPress={() => setMenuVisible(!menuVisible)} />
                    {menuVisible && <WallMenu setVisible={() => (setMenuVisible(!menuVisible))} wallId={wallId} editModal={() => setEditWallModal(true)} />}
                </View>
                {shared && <AddUserButton onPress={() => setAddUserVisible(true)} />}
            </View>
            <Text style={styles.wallName}>{wall.name.toUpperCase()}</Text>
            {addUserVisible && <View>
                <AddUserModal wallName={wall.name} wallId={wall.id} onClose={() => setAddUserVisible(false)} />
            </View>}
            <ScrollView contentContainerStyle={styles.scroller}>
                {quotes && quotes.map((quote) => {
                    return (
                        <WallIconQuote quote={{ ...quote, wallId: Number(wallId) }} key={quote.id} />
                    )
                })}
            </ScrollView>
            <AddQuoteModal isVisible={modalVisible} onClose={() => setModalVisible(false)} wallId={wallId} />
            <EditWallModal wall={wall} isVisible={editWallModal} onClose={() => setEditWallModal(false)}/>
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
    },
    menuButton: {
        paddingLeft: 10
    }
})

export default Wall
