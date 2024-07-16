import FeedQuote from "@/components/FeedQuote";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { feedArray, thunkLoadFeed } from "../../store/feed";
import { useEffect } from "react";
import { tulipColors } from "@/constants/Colors";
import FeedHeader from '@/components/Feed/FeedHeader'

export default function Feed() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkLoadFeed())
    }, [])
    const feed = useSelector(feedArray)
    return (
        <View style={styles.container}>
            <FeedHeader />
            <ScrollView>
                {feed.length > 0 && feed.map((quote) => {
                    return (
                        <FeedQuote quote={quote} key={quote.id} />
                    )
                })}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 50,
        backgroundColor: tulipColors.tulipWhite
    }
})
