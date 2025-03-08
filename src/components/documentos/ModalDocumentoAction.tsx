import { useDialogContext } from "context/DialogContext";
import { useSnackBarContext } from "context/SnackBarContext";
import { useDeleteDocumento } from "hooks";
import React from "react";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from "expo-router";

export const ModalDocumentoAction = () => {
    const { hideDialogConfirmation, modalConfirmationVisible } = useDialogContext();
    const { dispatch } = useNavigation();
    const { colors: { primary, onPrimaryContainer, onSurfaceDisabled } } = useTheme()

    return (
        <Portal>
            <Dialog visible={modalConfirmationVisible} onDismiss={hideDialogConfirmation} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Dialog.Title>Agregar documento</Dialog.Title>
                <Dialog.Content >
                    <Text variant="bodyMedium" style={{ textAlign: "center", marginBottom: 10 }}>
                        ¿Que tipo de accion desea realizar?
                    </Text>
                    <Button
                        style={{ marginTop: 10 }}
                        mode="contained-tonal"
                        textColor={primary}
                        onPress={async () => {
                            hideDialogConfirmation();
                            dispatch(
                                CommonActions.navigate({
                                    name: "fillDocumento",
                                })
                            );
                        }}
                    >
                        Crear documento a partir de datos
                    </Button>
                    <Button
                        style={{ marginTop: 10 }}
                        mode="contained-tonal"
                        textColor={onPrimaryContainer}
                        onPress={async () => {
                            hideDialogConfirmation();
                            dispatch(
                                CommonActions.navigate({
                                    name: "newDocumento",
                                })
                            );
                        }}
                    >
                        Cargar documento ya existente
                    </Button>
                    <Button
                        style={{ marginTop: 10 }}
                        textColor={onSurfaceDisabled}
                        onPress={hideDialogConfirmation} mode="contained-tonal">
                        Cancelar
                    </Button>
                </Dialog.Content>
                {/* <Dialog.Actions> */}

                {/* </Dialog.Actions> */}
            </Dialog>
        </Portal>
    );
};
