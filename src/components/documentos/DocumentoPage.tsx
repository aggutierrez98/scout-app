import { ScrollView } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useScout, useDocumento, useEditDocumento } from "hooks";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { CustomDatePicker } from "components/layout/DatePicker";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { EditDocumentoSchema } from "validators/documento";
import { useSnackBarContext } from "context/SnackBarContext";

type DocumentoParams = {
  documento: string;
};

type FormValues = {
  fechaPresentacion: Date;
};

export default function DocumentoPage() {
  const { toogleSnackBar } = useSnackBarContext();
  const theme = useTheme();
  const { documento } = useLocalSearchParams<DocumentoParams>();
  if (!documento) return null;

  const { data, isLoading } = useDocumento(documento);
  const { data: scoutData, isLoading: isLoadingScout } = useScout(
    data?.scoutId ?? ""
  );

  const { mutateAsync, isPending } = useEditDocumento();
  const { goBack } = useNavigation();

  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(EditDocumentoSchema),
    values: {
      fechaPresentacion: new Date(data?.fechaPresentacion || 0),
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
      {(isLoading || isLoadingScout || isPending) && <LoadingScreen />}

      <DescriptiveText
        title="Documento"
        description={data ? `${data?.documento.nombre}` : "-"}
      />
      <DescriptiveText
        title="Vence"
        description={data ? `${data?.documento.vence ? "Si" : "No"}` : "-"}
      />
      <DescriptiveText
        title="Presentado por"
        description={
          scoutData ? `${scoutData?.apellido} ${scoutData?.nombre}` : "-"
        }
      />
      <DescriptiveText
        title="DNI"
        description={scoutData ? `${scoutData.dni}` : "-"}
      />
      <Divider style={{ marginVertical: 10 }} />
      <FormProvider {...formMethods}>
        <CustomDatePicker
          name="fechaPresentacion"
          label="Fecha de presentacion"
        />
        <Button
          icon="send"
          mode="contained"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={{ marginVertical: 10 }}
          onPress={formMethods.handleSubmit(async (data) => {
            const resp = await mutateAsync({ id: documento, data });
            if (resp) {
              toogleSnackBar("Documento modificado con exito!", "success");
              goBack();
            } else toogleSnackBar("Error al modificar documento", "error");
          })}
        >
          Guardar
        </Button>
      </FormProvider>
    </ScrollView>
  );
}
