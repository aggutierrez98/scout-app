import React, { useState } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

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
						El servidor se encuentra desconectado
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
