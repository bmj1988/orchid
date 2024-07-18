import { View, Text } from 'react-native'
import FollowsRow from '@/components/buttons/ProfileButtons/FollowsRow'
import { tulipColors } from '@/constants/Colors';

const BioBar = ({ follows, followedBy, bio }) => {
    return (
        <View style={{display: "flex", alignItems: "center", marginTop: 5}}>
            {bio && bio.length > 0 && <Text style={{ color: tulipColors.tulipBlack }}>{bio}</Text>}
            <FollowsRow follows={follows} followedBy={followedBy} />
        </View>
    )
}

export default BioBar
