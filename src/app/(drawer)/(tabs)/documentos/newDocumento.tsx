import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect } from "expo-router";
import { CustomDropDown } from "components/layout/SelectInput";
import { useAllScouts } from "client/scouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomDatePicker } from "components/layout/DatePicker";
import { useSnackBarContext } from "context/SnackBarContext";
import { useCreateDocumento } from "client/documento";
import { CreateDocumentoSchema } from "validators/documento";
import { useMenuContext } from "context/MenuContext";

type FormValues = {
  scoutId: string;
  documentoId: string;
  fechaPresentacion: Date;
};

export default function newDocumento() {
  const theme = useTheme();
  const { data } = useRenewLogin();
  const { toogleSnackBar } = useSnackBarContext();
  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(CreateDocumentoSchema),
  });
  const { isSuccess, mutateAsync, isPending } = useCreateDocumento();
  const { data: users } = useAllScouts();
  const {
    documento: { documentosList },
  } = useMenuContext();

  const scoutsList =
    users?.map(({ id, nombre }) => ({
      label: nombre,
      value: id,
    })) || [];

  if (isSuccess) {
    return <Redirect href="/(drawer)/pagos" />;
  }

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

        <ScrollView
          style={[
            {
              flex: 1,
              padding: 10,
            },
          ]}
        >
          {isPending && <LoadingScreen />}

          <Text
            variant="titleLarge"
            style={{ marginTop: -5, marginBottom: 10 }}
          >
            Crear documento
          </Text>

          <FormProvider {...formMethods}>
            <CustomDropDown
              name="documentoId"
              label="Documento presentado"
              list={documentosList}
            />
            <CustomDropDown
              name="scoutId"
              label="Scout asociado"
              list={scoutsList}
            />

            <CustomDatePicker
              name="fechaPresentacion"
              label="Fecha de entrega del documento"
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
              onPress={formMethods.handleSubmit(async (data) => {
                const resp = await mutateAsync(data);
                if (resp) toogleSnackBar("Pago creado con exito!", "success");
                else toogleSnackBar("Error al crear pago", "error");
              })}
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
