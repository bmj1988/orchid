import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { tulipColors } from '@/constants/Colors'
import { useState } from 'react'
import { csrfFetch } from '@/store/csrfFetch'
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

const LikeButton = ({ liked, quoteId }) => {
    const [name, setName] = useState(liked)
    const onPress = async () => {
        if (name === "heart-outline") {
            await csrfFetch(`${URL}/api/likes/${quoteId}`, {
                method: 'POST',
            })
            setName("heart")
            return
        }
        else {
            await csrfFetch(`${URL}/api/likes/${quoteId}`, {
                method: "DELETE"
            })
            setName("heart-outline")
            return
        }
    }

    return (
        <Pressable onPress={() => onPress()}>
            <Icon size={30} name={name} color={tulipColors.tulipOrange} />
        </Pressable>

    )

}

export default LikeButton
