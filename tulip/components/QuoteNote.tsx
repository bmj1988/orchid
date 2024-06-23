import { StyleSheet, Text, View } from "react-native";

interface Quote {
    quote: string;
    author: string;
    color: string;
}

const QuoteNote: React.FC<Quote> = ({ quote, author, color }) => {
    return (
        <View style={styles.quoteContainer}>
            <View>
                <View style={[styles.textContainer, { backgroundColor: color }]}>
                    <Text style={styles.quoteText}>
                        {quote}
                    </Text>
                    <Text style={styles.authorText}>
                        {"- " + author}
                    </Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    quoteContainer: {
        width: 350,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        elevation: 5
    },
    textContainer: {
        borderRadius: 8,
        padding: 10,
    },
    quoteText: {
        fontSize: 16,
        color: "white",
    },
    authorText: {
        fontSize: 22,
        color: "white",
        fontStyle: "italic",
        textAlign: "right"
    }
})

export default QuoteNote
