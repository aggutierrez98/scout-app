import { useNotifications } from "hooks";
import { Notification, NotificationData } from "interfaces/auth";
import { FlatList, RefreshControl } from "react-native";
import { ActivityIndicator, Button, Dialog, Portal, Surface, Text, useTheme, List } from 'react-native-paper';
import { getFlattenData } from "utils/getFlattenData";
import NotificationItem from "./NotificationItem";

interface Props {
    modalVisible: boolean
    hideModal: () => void
}

export const ModalNotifications = ({ modalVisible, hideModal }: Props) => {

    const theme = useTheme()
    const { fetchNextPage, hasNextPage, isRefetching, refetch, data } = useNotifications()

    return (
        <Portal>
            <Dialog visible={modalVisible} onDismiss={hideModal}>
                <Dialog.Title>Notificaciones</Dialog.Title>
                <Dialog.Content>
                    <List.Section
                        style={{
                            marginBottom: 50,
                        }}
                    >
                        <FlatList
                            data={data.pages}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }: { item: Notification }) => (
                                <NotificationItem item={item} />
                            )}
                            onEndReached={() => hasNextPage && fetchNextPage()}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={
                                hasNextPage ? (
                                    <ActivityIndicator
                                        animating
                                        style={{ marginTop: 25 }}
                                        size={"small"}
                                    />
                                ) : null
                            }
                            ListEmptyComponent={
                                <Surface
                                    style={{
                                        marginTop: 15,
                                        padding: 20,
                                        borderRadius: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        alignSelf: "center",
                                    }}
                                    elevation={1}
                                >
                                    <Text variant="titleMedium">
                                        No se encontraron resultados
                                    </Text>
                                </Surface>
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefetching}
                                    onRefresh={refetch}
                                    progressViewOffset={10}
                                    progressBackgroundColor={
                                        theme.colors.secondaryContainer
                                    }
                                    colors={[theme.colors.primary]}
                                />
                            }
                        />
                    </List.Section>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        mode="contained-tonal"
                        onPress={async () => {
                            hideModal();
                        }}
                    >
                        Ok
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
