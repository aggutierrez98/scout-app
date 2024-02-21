import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { FormProvider, useForm } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { Redirect } from "expo-router";
import { CustomDropDown } from "components/layout/SelectInput";
import { VALID_METODOS_PAGO } from "utils/constants";
import { useAllScouts } from "client/scouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePagoSchema } from "validators/pago";
import { CustomDatePicker } from "components/layout/DatePicker";
import { useSnackBarContext } from "context/SnackBarContext";
import { useCreatePago } from "client/pago";
import { useMenuContext } from "context/MenuContext";

type FormValues = {
  scoutId: string;
  fechaPago: Date;
  concepto: string;
  metodoPago: string;
  monto: string;
};

export default function newPago() {
  const theme = useTheme();
  const { toogleSnackBar } = useSnackBarContext();
  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(CreatePagoSchema),
  });

  const { isSuccess, mutateAsync, isPending } = useCreatePago();
  const { data: users } = useAllScouts();
  const {
    metodoPago: { metodosPagoList },
  } = useMenuContext();

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
              list={metodosPagoList}
            />

            <CustomDropDown
              name="scoutId"
              label="Scout asociado"
              list={scoutsList}
            />

            <CustomDatePicker name="fechaPago" label="Fecha de pago" />

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
