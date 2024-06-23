import HE from '../../HorizontalEllipsis'

export default function ProfileMenuButton() {
    const onPress = () => {
        console.log('Profile ellipsis pressed')
    }

    return (
        <HE onPress={() => onPress()} />
    )
}
