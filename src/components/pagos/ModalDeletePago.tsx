import { useDialogContext } from "context/DialogContext";
import { useSnackBarContext } from "context/SnackBarContext";
import { useDeletePago } from "hooks";
import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const ModalDeletePago = () => {
  const { mutateAsync } = useDeletePago();
  const { hideDialog, idToDelete, modalVisible } = useDialogContext();
  const { toogleSnackBar } = useSnackBarContext();

  return (
    <Portal>
      <Dialog visible={modalVisible} onDismiss={hideDialog}>
        <Dialog.Title>Eliminar pago</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            ¿Esta seguro de eliminar el pago seleccionado?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained-tonal"
            textColor="red"
            onPress={async () => {
              hideDialog();
              const resp = await mutateAsync({ id: idToDelete });
              if (resp) toogleSnackBar("Exito al eliminar el pago", "success");
              else toogleSnackBar("Error al eliminar el pago", "error");
            }}
          >
            Confirmar
          </Button>
          <Button onPress={hideDialog} mode="contained-tonal">
            Cancelar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
