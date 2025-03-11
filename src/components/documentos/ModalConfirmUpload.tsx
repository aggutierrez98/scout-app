import { Button, Dialog, Portal, Text, } from 'react-native-paper';

interface Props {
    modalVisible: boolean
    hideModal: () => void,
    onPressFunction: () => void
}

export const ModalConfirmation = ({ modalVisible, hideModal, onPressFunction }: Props) => {

    return (
        <Portal>
            <Dialog visible={modalVisible} onDismiss={hideModal}>
                <Dialog.Title>¿Confirma subir el documento?</Dialog.Title>
                <Dialog.Content>

                    <Text variant="bodyMedium">Recuerde que luego de subido, se abrira el archivo para poder imprimirlo y presentarlo fisicamente</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        mode="contained-tonal"
                        onPress={async () => {
                            hideModal();
                            onPressFunction()
                        }}
                    >
                        Confirmar
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
