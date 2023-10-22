import { ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useScout } from "client/scouts";
import { useEditContext } from "context/EditContext";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { EditScoutSchema } from "validators/scout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VALID_FUNCTIONS,
  VALID_PROGRESSIONS,
  VALID_RELIGIONS,
} from "validators/constants";
import { CustomDropDown } from "components/layout/SelectInput";
import { usePatrullas } from "client/patrulla";
import { DescriptiveText } from "components/layout/DescriptiveText";

type ScoutParams = {
  scout: string;
};

export default function ScoutPage() {
  const theme = useTheme();
  const { scout: scoutId } = useLocalSearchParams<ScoutParams>();
  if (!scoutId) return null;
  const { data, isLoading } = useScout(scoutId);
  const { data: patrullas, isLoading: isLoadingPatrullas } = usePatrullas();

  const formMethods = useForm({
    mode: "onBlur",
    resolver: zodResolver(EditScoutSchema),
  });
  const { isEditing } = useEditContext();

  const religionList = VALID_RELIGIONS.map((religion) => {
    return {
      label: religion,
      value: religion,
    };
  });
  const funcionList = VALID_FUNCTIONS.map((funcion) => {
    return {
      label: funcion,
      value: funcion,
    };
  });
  const progressionList = VALID_PROGRESSIONS.map((progression) => {
    return {
      label: progression,
      value: progression,
    };
  });
  const patrullasList =
    patrullas?.map((patrulla) => {
      return {
        label: patrulla.nombre,
        value: patrulla.id,
      };
    }) ?? [];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (isLoading || isLoadingPatrullas)
    return (
      <ActivityIndicator animating style={{ marginTop: 25 }} size={"large"} />
    );

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          padding: 10,
          paddingTop: 0,
          backgroundColor: theme.colors.backdrop,
        },
      ]}
    >
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
          <DescriptiveText title="Telefono" description={data?.telefono} />
          <DescriptiveText title="Mail" description={data?.mail} />
          <DescriptiveText
            title="Direccion"
            description={`${data?.direccion} - ${data?.localidad}`}
          />
          <DescriptiveText title="Funcion" description={data?.funcion} />
          <DescriptiveText title="Religion" description={data?.religion} />
          <DescriptiveText
            title="Patrulla"
            description={data?.patrulla?.nombre}
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
              defaultValue={data?.telefono ?? ""}
            />
            <CustomTextInput
              name="mail"
              label="Mail"
              placeholder="Ingrese email"
              defaultValue={data?.mail ?? ""}
            />
            <CustomTextInput
              name="direccion"
              label="Calle"
              placeholder="Ingrese calle y numero"
              defaultValue={data?.direccion ?? ""}
            />
            <CustomTextInput
              name="localidad"
              label="Localidad"
              placeholder="Ingrese localidad"
              defaultValue={data?.localidad ?? ""}
            />

            <CustomDropDown
              name="religion"
              label="Religion"
              list={religionList}
              defaultValue={data?.religion ?? ""}
            />

            <CustomDropDown
              name="funcion"
              label="Funcion"
              list={funcionList}
              defaultValue={data?.funcion ?? ""}
            />

            <CustomDropDown
              name="patrulla"
              label="Patrulla"
              list={patrullasList}
              defaultValue={data?.patrullaId ?? ""}
            />

            <CustomDropDown
              name="progresion"
              label="Progresion"
              list={progressionList}
              defaultValue={data?.progresionActual ?? ""}
            />

            <Button
              icon="send"
              mode="contained"
              contentStyle={{ flexDirection: "row-reverse" }}
              style={{ marginTop: 10 }}
              onPress={formMethods.handleSubmit(onSubmit)}
            >
              Guardar
            </Button>
          </FormProvider>
        </>
      )}
    </ScrollView>
  );
}
