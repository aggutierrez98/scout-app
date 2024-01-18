import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { FormProvider, useForm } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { Redirect, useNavigation } from "expo-router";
import { CustomDropDown } from "components/layout/SelectInput";
import { VALID_METODOS_PAGO, VALID_ROLES } from "validators/constants";
import { useAllScouts } from "client/scouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePagoSchema } from "validators/pago";
import { CustomDatePicker } from "components/layout/DatePicker";
import { useSnackBarContext } from "context/SnackBarContext";
import { useCreatePago } from "client/pago";

type FormValues = {
  scoutId: string;
  fechaPago: Date;
  concepto: string;
  metodoPago: string;
  monto: string;
};

export default function newPago() {
  const theme = useTheme();
  const { data } = useRenewLogin();
  const { toogleSnackBar } = useSnackBarContext();
  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(CreatePagoSchema),
  });

  const { isSuccess, status, mutateAsync } = useCreatePago();
  const { data: users } = useAllScouts();

  const metodosList = VALID_METODOS_PAGO.map((metodo) => ({
    label: metodo,
    value: metodo,
  }));

  if (isSuccess) {
    return <Redirect href="/(drawer)/pagos" />;
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

        {data ? (
          <ScrollView
            style={[
              {
                flex: 1,
                padding: 10,
              },
            ]}
          >
            {status === "pending" && <LoadingScreen />}

            <Text
              variant="titleLarge"
              style={{ marginTop: -5, marginBottom: 10 }}
            >
              Crear pago
            </Text>

            <FormProvider {...formMethods}>
              <CustomTextInput
                name="concepto"
                label="Concepto"
                placeholder="Ingrese concepto"
                style={{ marginTop: 10 }}
              />

              <CustomTextInput
                name="monto"
                label="Monto"
                placeholder="Ingrese monto"
                keyboardType="numeric"
                style={{ marginTop: 10 }}
              />

              <CustomDropDown
                name="metodoPago"
                label="Metodo de pago"
                list={metodosList}
                defaultValue={""}
              />

              <CustomDropDown
                name="scoutId"
                label="Scout asociado"
                list={scoutsList}
                defaultValue={""}
              />

              <CustomDatePicker
                name="fechaPago"
                label="Fecha de pago"
                defaultValue={new Date()}
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
        ) : (
          <LoadingScreen />
        )}
      </SafeAreaView>
    </>
  );
}
