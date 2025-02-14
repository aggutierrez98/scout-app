import { ScrollView } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEditContext } from "context/EditContext";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { EditScoutSchema } from "validators/scout";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomDropDown } from "components/layout/SelectInput";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useSnackBarContext } from "context/SnackBarContext";
import { useEditScout, useScout } from "hooks";
import { useMenuContext } from "context/MenuContext";

type ScoutParams = {
	scout: string;
};

// // type FormValues = {
// // 	telefono: string;
// // 	mail: string;
// // 	direccion: string;
// // 	localidad: string;
// // 	religion: string;
// // 	funcion: string;
// // 	equipoId: string;
// // 	rama: string;
// // 	progresionActual: string;
// // };
export default function ScoutPage() {
	const theme = useTheme();
	const { toogleSnackBar } = useSnackBarContext();
	const { scout: scoutId } = useLocalSearchParams<ScoutParams>();
	if (!scoutId) return null;
	const { data, isLoading } = useScout(scoutId);
	const { mutateAsync, isPending } = useEditScout();
	const { goBack } = useNavigation();
	const { isEditing, changeIsEditing } = useEditContext();
	const {
		progresion: { progresionList },
		equipo: { equipoList },
		funcion: { funcionesList },
		rama: { ramasList },
		religionList,
	} = useMenuContext();

	const formMethods = useForm({
		mode: "onBlur",
		resolver: zodResolver(EditScoutSchema),
		values: {
			direccion: data?.direccion ?? "",
			funcion: data?.funcion ?? "",
			localidad: data?.localidad ?? "",
			mail: data?.mail ?? "",
			rama: data?.rama ?? "",
			equipoId: data?.equipoId ?? "",
			progresionActual: data?.progresionActual ?? "",
			religion: data?.religion ?? "",
			telefono: data?.telefono ?? "",
		},
	});

	return (
		<ScrollView
			style={[
				{
					flex: 1,
					padding: 20,
					paddingTop: 0,
					backgroundColor: theme.colors.background,
				},
			]}
		>
			{(isLoading || isPending) && <LoadingScreen />}

			<Text style={{ fontSize: 25 }}>
				{data?.apellido} {data?.nombre}
			</Text>
			<Divider style={{ marginBottom: 10 }} />

			<DescriptiveText title="DNI" description={data?.dni || "-"} />
			<DescriptiveText title="Edad" description={`${data?.edad} Años`} />
			<DescriptiveText
				title="Sexo"
				description={data?.sexo === "M" ? "Masculino" : "Femenino"}
			/>

			{!isEditing ? (
				<>
					<DescriptiveText
						title="Telefono"
						description={data?.telefono}
					/>
					<DescriptiveText title="Mail" description={data?.mail} />
					<DescriptiveText
						title="Direccion"
						description={`${data?.direccion} - ${data?.localidad}`}
					/>
					<DescriptiveText
						title="Funcion"
						description={data?.funcion}
					/>
					<DescriptiveText
						title="Religion"
						description={data?.religion}
					/>
					<DescriptiveText
						title="Rama"
						description={data?.rama}
					/>
					<DescriptiveText
						title="Equipo"
						description={data?.equipo?.nombre}
					/>
				</>
			) : (
				<>
					<Divider style={{ marginVertical: 10 }} />

					<FormProvider {...formMethods}>
						<CustomTextInput
							name="telefono"
							label="Telefono"
							placeholder="Ingrese numero de telefono"
						/>
						<CustomTextInput
							name="mail"
							label="Mail"
							placeholder="Ingrese email"
						/>
						<CustomTextInput
							name="direccion"
							label="Calle"
							placeholder="Ingrese calle y numero"
						/>
						<CustomTextInput
							name="localidad"
							label="Localidad"
							placeholder="Ingrese localidad"
						/>

						<CustomDropDown
							name="religion"
							label="Religion"
							list={religionList}
						/>

						<CustomDropDown
							name="funcion"
							label="Funcion"
							list={funcionesList}
						/>

						<CustomDropDown
							name="equipoId"
							label="Equipo"
							list={equipoList}
						/>

						<CustomDropDown
							name="rama"
							label="Rama"
							list={ramasList}
						/>

						<CustomDropDown
							name="progresionActual"
							label="Progresion"
							list={progresionList}
						/>

						<Button
							icon="send"
							mode="contained"
							contentStyle={{ flexDirection: "row-reverse" }}
							style={{ marginVertical: 10 }}
							onPress={formMethods.handleSubmit(async (data) => {
								// for (const key of Object.keys(data)) {
								// 	if (data[key as keyof FormValues] === "") {
								// 		(data[
								// 			key as keyof FormValues
								// 		] as unknown) = null;
								// 	}
								// }
								const resp = await mutateAsync({
									id: scoutId,
									data,
								});
								if (resp) {
									toogleSnackBar(
										"Scout modificado con exito!",
										"success",
									);
									changeIsEditing()
									goBack();
								} else
									toogleSnackBar(
										"Error al modificar el scout",
										"error",
									);
							})}
						>
							Guardar
						</Button>
					</FormProvider>
				</>
			)}
		</ScrollView>
	);
}
