import { ScrollView, View } from "react-native";
import {
  Appbar,
  Badge,
  Button,
  Divider,
  List,
  MD3Colors,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEditContext } from "context/EditContext";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { VALID_ESTADO_CIVIL } from "utils/constants";
import { CustomDropDown } from "components/layout/SelectInput";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useSnackBarContext } from "context/SnackBarContext";
import { useEditFamiliar, useFamiliar } from "client/familiar";
import { EditFamiliarSchema } from "validators/familiar";
import { StatusBar } from "expo-status-bar";
import FamiliaList from "./FamiliaList";
import { useMenuContext } from "context/MenuContext";

type FamiliarParams = {
  familiar: string;
};

type FormValues = {
  estadoCivil: string;
  telefono: string;
  mail: string;
  direccion: string;
  localidad: string;
};

export default function FamiliarPage() {
  const { toogleSnackBar } = useSnackBarContext();
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { familiar: familiarId } = useLocalSearchParams<FamiliarParams>();
  if (!familiarId) return null;
  const { changeIsEditing, isEditing } = useEditContext();
  const { data, isLoading } = useFamiliar(familiarId);
  const { mutateAsync, isPending } = useEditFamiliar();
  const { estadoCivilList } = useMenuContext();

  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(EditFamiliarSchema),
    values: {
      direccion: data?.direccion ?? "",
      estadoCivil: data?.estadoCivil ?? "",
      localidad: data?.localidad ?? "",
      mail: data?.mail ?? "",
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
      <StatusBar style="auto" />
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.background,
          height: 40,
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: -10,
        }}
      >
        <Appbar.BackAction
          onPress={() => {
            if (isEditing) changeIsEditing();
            goBack();
          }}
        />

        <Appbar.Content
          style={{ marginLeft: 10 }}
          title={`${data?.nombre} ${data?.apellido}`}
        />

        <Appbar.Action
          icon="pencil-circle"
          size={35}
          onPress={() => changeIsEditing()}
        />
      </Appbar.Header>

      <Divider style={{ marginBottom: 10 }} />

      {(isLoading || isPending) && <LoadingScreen />}

      <DescriptiveText title="DNI" description={data?.dni || "-"} />
      <DescriptiveText title="Edad" description={`${data?.edad} Años`} />
      <DescriptiveText
        title="Sexo"
        description={data?.sexo === "M" ? "Masculino" : "Femenino"}
      />

      {!isEditing ? (
        <>
          <DescriptiveText title="Telefono" description={data?.telefono} />
          <DescriptiveText title="Mail" description={data?.mail} />
          <DescriptiveText
            title="Direccion"
            description={`${data?.direccion} - ${data?.localidad}`}
          />
          <DescriptiveText
            title="Estado Civil"
            description={data?.estadoCivil}
          />

          <Divider style={{ marginVertical: 10 }} />
          {!!data && (
            <FamiliaList
              scoutsData={data?.scoutFamiliares}
              sexo={data?.sexo}
              familiarId={data?.id}
            />
          )}
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
              name="estadoCivil"
              label="Estado civil"
              list={estadoCivilList}
            />

            <Divider style={{ marginVertical: 0 }} />

            {!!data && (
              <FamiliaList
                scoutsData={data?.scoutFamiliares}
                sexo={data?.sexo}
                familiarId={data?.id}
              />
            )}

            <Button
              icon="send"
              mode="contained"
              contentStyle={{ flexDirection: "row-reverse" }}
              style={{ marginVertical: 20 }}
              onPress={formMethods.handleSubmit(async (data) => {
                Object.keys(data).forEach((key) => {
                  if (data[key as keyof FormValues] === "") {
                    (data[key as keyof FormValues] as unknown) = null;
                  }
                });
                const resp = await mutateAsync({ id: familiarId, data });
                if (resp) {
                  toogleSnackBar("Familiar modificado con exito!", "success");
                  goBack();
                } else
                  toogleSnackBar("Error al modificar el familiar", "error");
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
