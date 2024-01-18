import { ScrollView } from "react-native";
import { Button, Divider, useTheme, Appbar } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useScout } from "client/scouts";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { VALID_METODOS_PAGO } from "validators/constants";
import { CustomDropDown } from "components/layout/SelectInput";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useEditPago, usePago } from "client/pago";
import { CustomSwitchInput } from "components/layout/SwitchInput";
import { CustomDatePicker } from "components/layout/DatePicker";
import { EditPagoSchema } from "validators/pago";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { useSnackBarContext } from "context/SnackBarContext";

type PagoParams = {
  pago: string;
};

type FormValues = {
  scoutId: string;
  fechaPago: Date;
  concepto: string;
  metodoPago: string;
  monto: string;
  rendido: string;
};

export default function PagoPage() {
  const theme = useTheme();
  const { pago: pagoId } = useLocalSearchParams<PagoParams>();
  if (!pagoId) return null;

  const { toogleSnackBar } = useSnackBarContext();
  const { data, isLoading } = usePago(pagoId);
  const { data: scoutData, isLoading: isLoadingScout } = useScout(
    data?.scoutId ?? ""
  );

  const { mutateAsync, isPending } = useEditPago();
  const { goBack } = useNavigation();

  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(EditPagoSchema),
  });
  const metodoPagoList = VALID_METODOS_PAGO.map((metodoPago) => {
    return {
      label: metodoPago,
      value: metodoPago,
    };
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
        title="  Nombre"
        description={
          scoutData ? `${scoutData?.apellido} ${scoutData?.nombre}` : "-"
        }
      />

      <Divider style={{ marginVertical: 10 }} />
      <FormProvider {...formMethods}>
        <CustomTextInput
          name="concepto"
          label="Concepto"
          placeholder="Ingrese concepto"
          defaultValue={data?.concepto ?? ""}
        />
        <CustomTextInput
          name="monto"
          label="Monto"
          placeholder="Ingrese monto"
          defaultValue={data?.monto ?? ""}
        />

        <CustomDatePicker
          name="fechaPago"
          label="Fecha de pago"
          defaultValue={new Date(data?.fechaPago || 0)}
        />

        <CustomDropDown
          name="metodoPago"
          label="Metodo de pago"
          list={metodoPagoList}
          defaultValue={data?.metodoPago ?? ""}
        />

        <CustomSwitchInput
          name="rendido"
          label="Pago rendido"
          defaultValue={!!data?.rendido}
        />

        <Button
          icon="send"
          mode="contained"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={{ marginVertical: 10 }}
          onPress={formMethods.handleSubmit(async (data) => {
            const resp = await mutateAsync({ id: pagoId, data });
            if (resp) {
              toogleSnackBar("Pago modificado con exito!", "success");
              goBack();
            } else toogleSnackBar("Error al modificar el pago", "error");
          })}
        >
          Guardar
        </Button>
      </FormProvider>
    </ScrollView>
  );
}
