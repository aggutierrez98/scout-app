import { useDialogContext } from "context/DialogContext";
import { useRouter } from "expo-router";
import { Notification } from "interfaces/auth";
import React, { Fragment, memo } from "react";
import {
    Divider,
    IconButton,
    List,
    TouchableRipple,
    useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    item: Notification;
}

export default memo(function NotificationItem({ item }: Props) {
    // const router = useRouter();
    const { colors } = useTheme();
    // const { setIdToDelete, showDialog } = useDialogContext();

    return (
        <Fragment key={item.id}>
            <TouchableRipple
                onPress={() => {
                    //TODO: Gestionar tambien
                }}
                style={{
                    paddingHorizontal: 5,
                }}
            >
                <List.Item
                    title={`${item.message}`}
                    left={() => (
                        <Icon
                            name={item.read ? "beaker-check" : "beaker"}
                            color={item.read ? colors.primary : colors.tertiary}
                            size={35}
                        />
                    )}
                    right={() => (
                        <IconButton
                            style={{ margin: 0, marginRight: -20 }}
                            icon="delete"
                            size={20}
                            onPress={() => {
                                //TODO: Gestionar notificaciones
                                // setIdToDelete(item.id);
                                // showDialog();
                            }}
                        />
                    )}
                />
            </TouchableRipple>
            <Divider style={{ marginVertical: -5 }} />
        </Fragment>
    );
});
