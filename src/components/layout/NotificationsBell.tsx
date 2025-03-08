import { useNotifications } from "hooks"
import { View } from "react-native"
import { Appbar, Badge } from "react-native-paper"
import { ModalNotifications } from "./ModalNotifications"
import { useState } from "react"

export const NotificationsBell = () => {
    const { data, isFetched } = useNotifications()
    const [visible, setVisible] = useState(false);
    const hideDialog = () => {
        setVisible(false);
    };
    const unreadCount = data.unreadCount as number

    return (
        <>
            <View>
                {isFetched && !!unreadCount &&
                    <Badge
                        style={{ position: 'absolute', top: 5, right: 5 }}
                        size={18}
                    >
                        {String(unreadCount)}
                    </Badge>
                }
                <Appbar.Action
                    icon={!!unreadCount ? 'bell' : 'bell-outline'}
                    accessibilityLabel="TagNotifications"
                    onPress={() => {
                        setVisible(true)
                    }}
                />

            </View>

            <ModalNotifications modalVisible={visible} hideModal={hideDialog} />
        </>
    )
}
