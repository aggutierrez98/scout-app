import React, { useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
const errorMsg = __DEV__ ? "El servidor se encuentra desconectado" : "El servidor se encuentra en mantenimiento"

export const ModalServerDisconnected = () => {
	const [visible, setVisible] = useState(true);
	const hideDialog = () => {
		setVisible(false);
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title>Error de servidor</Dialog.Title>
				<Dialog.Content>
					<Text variant="bodyMedium">
						{errorMsg}
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button
						mode="contained-tonal"
						onPress={async () => {
							hideDialog();
						}}
					>
						Ok
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
