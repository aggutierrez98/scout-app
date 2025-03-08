import { Appbar, Button, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCreateUser, useAllScouts, useAllFamiliares } from "hooks";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { FormProvider, useForm } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { Redirect, useNavigation } from "expo-router";
import { CustomDropDown } from "components/layout/SelectInput";
import { VALID_ROLES } from "utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema } from "validators/auth";
import CustomSearchableDropdown from 'components/layout/CustomSearchableDropdown';
import { NotificationsBell } from "components/layout/NotificationsBell";

type FormValues = {
	username: string;
	password: string;
	role: string;
	scoutId: string;
};

export default function NewUser() {
	const theme = useTheme();
	const { goBack } = useNavigation();
	const formMethods = useForm<FormValues>({
		mode: "onBlur",
		resolver: zodResolver(CreateUserSchema),
	});
	const { isSuccess, mutate, isPending } = useCreateUser();
	const { data: users } = useAllScouts();
	const { data: familiares } = useAllFamiliares();
	const rolList = VALID_ROLES.map((role) => ({
		label: role,
		value: role,
	}));

	if (isSuccess) return <Redirect href="/(drawer)/users" />;

	const scoutsList =
		users?.map(({ id, nombre, apellido }) => ({
			label: `${apellido} ${nombre}`,
			value: id,
		})) || [];
	const familiaresList =
		familiares?.map(({ id, nombre, apellido }) => ({
			label: `${apellido} ${nombre}`,
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
					<NotificationsBell />

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

						<CustomDropDown
							name="role"
							label="Rol"
							list={rolList}
						/>

						<CustomSearchableDropdown
							name="scoutId"
							label="Scout asociado"
							list={scoutsList}
						/>
						<CustomSearchableDropdown
							name="familiarId"
							label="Familiar asociado"
							list={familiaresList}
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
