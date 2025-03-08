import { Dimensions, View } from "react-native";
import { Button, Checkbox, Divider, Text } from "react-native-paper";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { useFirstLogin, useLogin } from "hooks";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirstLoginUserSchema, LoginUserSchema } from "validators/auth";
import { ModalServerDisconnected } from "./ModalServerDisconnected";
import { useState } from "react";

type FormValues = {
	username: string;
	password: string;
	passwordConfirmation?: string;
};

const texts = {
	title: {
		login: "Iniciar sesion",
		fisrtEnter: "Entrar por primera vez",
	},
	placeholders: {
		login: {
			username: "Ingrese nombre de usuario",
			password: "Ingrese contraseña"
		},
		fisrtEnter: {
			username: "Ingrese nombre de usuario valido",
			password: "Introduzca nueva contraseña",
			confirmation: "Introduzca nuevamente la contraseña"
		},
	}

}

export default function LoginForm() {

	const [isFirstEnter, setIsFirstEnter] = useState(false)
	const formMethods = useForm<FormValues>({
		mode: "onBlur",
		resolver: zodResolver(isFirstEnter ? FirstLoginUserSchema : LoginUserSchema),
	});
	const { mutate: mutateLogin, isPending: loginPending } = useLogin(formMethods.setError);
	const { mutateAsync: mutateFirstLogin, isPending: firstLoginPending } = useFirstLogin(formMethods.setError);

	return (
		<>
			{(loginPending || firstLoginPending) && <LoadingScreen />}
			<View
				style={[
					{
						justifyContent: "center",
						width: Dimensions.get("window").width * 0.9,
						padding: 10,
						paddingTop: 0,
						paddingBottom: 100,
					},
				]}
			>
				<Text
					style={{
						fontSize: 25,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					{isFirstEnter ? texts.title.fisrtEnter : texts.title.login}
				</Text>
				<Divider style={{ marginVertical: 10 }} />

				<FormProvider {...formMethods}>
					<CustomTextInput
						name="username"
						label="Usuario"
						placeholder={texts.placeholders.fisrtEnter.username}
						style={{ marginTop: 20 }}
					/>
					<CustomTextInput
						name="password"
						label="Contraseña"
						placeholder={texts.placeholders.fisrtEnter.password}
						hidden
						style={{ marginTop: 10, position: "relative" }}
					/>

					{isFirstEnter &&
						<CustomTextInput
							name="passwordConfirm"
							label="Confirmar contraseña"
							placeholder={texts.placeholders.fisrtEnter.confirmation}
							hidden
							style={{ marginTop: 10, position: "relative" }}
						/>
					}

					<Checkbox.Item
						label="Primer ingreso?"
						status={isFirstEnter ? "checked" : "unchecked"}
						onPress={() => setIsFirstEnter(firstEnter => !firstEnter)}
					/>

					<Button
						mode="contained"
						contentStyle={{
							flexDirection: "row-reverse",
							alignItems: "center",
							justifyContent: "center",
						}}
						style={{ marginTop: 20 }}
						onPress={formMethods.handleSubmit(async (data) => {
							if (isFirstEnter) {
								const response = await mutateFirstLogin(data)
								if (response) {
									formMethods.setValue("username", response.username)
									setIsFirstEnter(false)
								} else {
									formMethods.setError("username", { message: "Usuario ingresado no es valido" })
								}
							}
							else mutateLogin(data)
						}
						)}
						labelStyle={{
							fontSize: 17,
							fontWeight: "bold",
						}}
					>
						Enviar
					</Button>


				</FormProvider>

				{formMethods.formState.errors.root?.type === "server" && (
					<ModalServerDisconnected />
				)}
			</View>
		</>
	);
}
