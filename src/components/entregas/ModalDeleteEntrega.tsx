import { useEntregaContext } from "context/EntregaContext";
import { useSnackBarContext } from "context/SnackBarContext";
import { useDeleteEntrega } from "hooks";
import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const ModalDeleteEntrega = () => {
  const { mutateAsync } = useDeleteEntrega();
  const { hideDialog, idToDelete, modalVisible } = useEntregaContext();
  const { toogleSnackBar } = useSnackBarContext();

  return (
    <Portal>
      <Dialog visible={modalVisible} onDismiss={hideDialog}>
        <Dialog.Title>Eliminar entrega</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            ¿Esta seguro de eliminar la entrega seleccionada?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained-tonal"
            textColor="red"
            onPress={async () => {
              hideDialog();
              const resp = await mutateAsync({ id: idToDelete });
              if (resp)
                toogleSnackBar("Exito al eliminar la entrega", "success");
              else toogleSnackBar("Error al eliminar la entrega", "error");
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
