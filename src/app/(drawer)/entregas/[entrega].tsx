import { ScrollView } from "react-native";
import { Button, Divider, useTheme, Appbar } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VALID_ENTREGAS_TYPE } from "utils/constants";
import { CustomDropDown } from "components/layout/SelectInput";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { CustomDatePicker } from "components/layout/DatePicker";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { useSnackBarContext } from "context/SnackBarContext";
import { useEditEntrega, useEntrega } from "client/entregas";
import { EditEntregaSchema } from "validators/entrega";
import { useMenuContext } from "context/MenuContext";

type EntregaParams = {
  entrega: string;
};

type FormValues = {
  scoutId: string;
  tipoEntrega: string;
  fechaEntrega: Date;
};

export default function EntregaPage() {
  const theme = useTheme();
  const { entrega: entregaId } = useLocalSearchParams<EntregaParams>();
  if (!entregaId) return null;

  const { goBack } = useNavigation();
  const { toogleSnackBar } = useSnackBarContext();
  const { data, isLoading, isPending: entregaPending } = useEntrega(entregaId);
  const { mutateAsync, isPending } = useEditEntrega();
  const {
    tipoEntrega: { tipoEntregaList },
  } = useMenuContext();

  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(EditEntregaSchema),
    values: {
      fechaEntrega: new Date(data?.fechaEntrega || 0),
      scoutId: data?.scoutId ?? "",
      tipoEntrega: data?.tipoEntrega ?? "",
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
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.background,
          height: 40,
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        <Appbar.BackAction
          onPress={() => {
            goBack();
          }}
        />
        <Appbar.Content title="Entregas" />
      </Appbar.Header>

      {(isLoading || entregaPending || isPending) && <LoadingScreen />}

      <DescriptiveText
        title="Nombre"
        description={
          data?.scout ? `${data.scout?.apellido} ${data.scout?.nombre}` : "-"
        }
      />

      <Divider style={{ marginVertical: 10 }} />
      <FormProvider {...formMethods}>
        <CustomDatePicker name="fechaEntrega" label="Fecha de entrega" />

        <CustomDropDown
          name="tipoEntrega"
          label="Tipo de entrega"
          list={tipoEntregaList}
        />
        <Button
          icon="send"
          mode="contained"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={{ marginVertical: 10 }}
          onPress={formMethods.handleSubmit(async (data) => {
            const resp = await mutateAsync({ id: entregaId, data });
            if (resp) {
              toogleSnackBar("Entrega modificada con exito!", "success");
              goBack();
            } else toogleSnackBar("Error al modificar la entrega", "error");
          })}
        >
          Guardar
        </Button>
      </FormProvider>
    </ScrollView>
  );
}
