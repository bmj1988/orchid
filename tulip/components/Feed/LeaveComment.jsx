import { useState } from "react"
import { Button, TextInput, View } from "react-native"
import { useDispatch } from 'react-redux'
import { thunkLeaveComment } from '@/store/feed'
import { tulipColors } from "@/constants/Colors"

const LeaveComment = ({ quoteId, onClose }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState("")
    const submit = async () => {
        const info = {
            quoteId,
            content: comment,
        }
        await dispatch(thunkLeaveComment(info))
        setComment("")
        onClose()

    }
    return (
        <View>
            <TextInput
                value={comment}
                onChangeText={setComment} />
            <Button onPress={() => submit()} title="Leave comment" color={tulipColors.tulipBlue}/>
        </View>
    )
}

export default LeaveComment
