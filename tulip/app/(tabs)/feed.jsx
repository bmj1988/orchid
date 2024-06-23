import FeedQuote from "@/components/FeedQuote";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadFeed } from "../../store/feed";
import { useEffect } from "react";

export default function Feed() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkLoadFeed())
    }, [])
    const feed = useSelector((state) => state.feed)
    console.log(feed)
    return (
        <View style={styles.container}>
            <ScrollView>
                {feed.length > 0 && feed.map((quote) => {
                    return (
                        <FeedQuote quote={quote} key={quote.id}/>
                    )
                })}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
})
