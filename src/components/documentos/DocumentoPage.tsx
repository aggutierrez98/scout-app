import { ScrollView } from "react-native";
import { Appbar, Button, Divider, useTheme } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useScout, useDocumento, useEditDocumento, useDownloadDocumento } from "hooks";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { CustomDatePicker } from "components/layout/DatePicker";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { EditDocumentoSchema } from "validators/documento";
import { useSnackBarContext } from "context/SnackBarContext";
import * as WebBrowser from "expo-web-browser";

type DocumentoParams = {
  documento: string;
};

type FormValues = {
  fechaPresentacion: Date;
};

export default function DocumentoPage() {
  const { toogleSnackBar } = useSnackBarContext();
  const theme = useTheme();
  const { documento: documentoId } = useLocalSearchParams<DocumentoParams>();
  if (!documentoId) return null;

  const { data, isLoading } = useDocumento(documentoId);
  const { data: downloadData, isLoading: downloadLoading } = useDownloadDocumento(documentoId);
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
      {(isLoading || downloadLoading || isLoadingScout || isPending) && <LoadingScreen />}

      <DescriptiveText
        title="Documento"
        style={{ maxWidth: "85%" }}
        description={data ? `${data?.documento.nombre}as` : "-"}
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
            const resp = await mutateAsync({ id: documentoId, data });
            if (resp) {
              toogleSnackBar("Documento modificado con exito!", "success");
              goBack();
            } else toogleSnackBar("Error al modificar documento", "error");
          })}
        >
          Guardar
        </Button>
      </FormProvider>

      <Appbar.Action
        icon="file-download"
        size={28}
        style={{ marginVertical: 10, position: "absolute", top: -10, right: -5, zIndex: 10 }}
        onPress={() => {
          if (!downloadData) toogleSnackBar("No existe archivo almacenado del documento", "error");
          else WebBrowser.openBrowserAsync(downloadData.fileUrl)
        }
        }
      />
    </ScrollView>
  );
}
