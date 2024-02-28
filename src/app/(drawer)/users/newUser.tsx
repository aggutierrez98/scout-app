import { Appbar, Button, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCreateUser, useAllScouts } from "hooks";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FormProvider, useForm } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { Redirect, useNavigation } from "expo-router";
import { CustomDropDown } from "components/layout/SelectInput";
import { VALID_ROLES } from "utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema } from "validators/auth";

type FormValues = {
	username: string;
	password: string;
	role: string;
	scoutId: string;
};

export default function NewUser() {
	const theme = useTheme();
	const { goBack } = useNavigation();
	const [hidePass, setHidePass] = useState(true);
	const formMethods = useForm<FormValues>({
		mode: "onBlur",
		resolver: zodResolver(CreateUserSchema),
	});
	const { isSuccess, mutate, isPending } = useCreateUser();
	const { data: users } = useAllScouts(true);
	const rolList = VALID_ROLES.map((role) => ({
		label: role,
		value: role,
	}));

	if (isSuccess) {
		return <Redirect href="/(drawer)/users" />;
	}

	const scoutsList =
		users?.map(({ id, nombre }) => ({
			label: nombre,
			value: id,
		})) || [];

	return (
		<>
			<SafeAreaView
				style={[
					{
						flex: 1,
						padding: 10,
						backgroundColor: theme.colors.background,
					},
				]}
			>
				<StatusBar style="auto" />
				<Appbar.Header
					style={{
						backgroundColor: theme.colors.background,
						height: 40,
						marginBottom: 10,
						marginTop: 10,
					}}
				>
					<Appbar.BackAction
						onPress={() => {
							goBack();
						}}
					/>
					<Appbar.Content title="Nuevo usuario" />
				</Appbar.Header>

				<ScrollView
					style={[
						{
							flex: 1,
							padding: 10,
						},
					]}
				>
					{isPending && <LoadingScreen />}

					<FormProvider {...formMethods}>
						<CustomTextInput
							name="username"
							label="Usuario"
							placeholder="Ingrese nombre de usuario"
							style={{ marginTop: 10 }}
						/>
						<View>
							<CustomTextInput
								name="password"
								label="Contraseña"
								placeholder="Ingrese contraseña"
								secureTextEntry={hidePass ? true : false}
								style={{ marginTop: 10, position: "relative" }}
							/>
							<Button
								style={{
									position: "absolute",
									right: 0,
									top: 30,
								}}
								onPress={() => setHidePass(!hidePass)}
							>
								<Icon
									name={hidePass ? "eye" : "eye-off"}
									size={20}
								/>
							</Button>
						</View>

						<CustomDropDown
							name="role"
							label="Rol"
							list={rolList}
						/>

						<CustomDropDown
							name="scoutId"
							label="Scout asociado"
							list={scoutsList}
						/>

						<Button
							mode="contained"
							icon="send"
							contentStyle={{
								flexDirection: "row-reverse",
								alignItems: "center",
								justifyContent: "center",
							}}
							style={{ marginTop: 20 }}
							onPress={formMethods.handleSubmit((data) =>
								mutate(data),
							)}
							labelStyle={{
								fontSize: 17,
								fontWeight: "bold",
							}}
						>
							Guadar
						</Button>
					</FormProvider>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}
