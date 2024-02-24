import { ScrollView } from "react-native";
import { Button, Divider, useTheme } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { CustomTextInput } from "components/layout/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomDropDown } from "components/layout/SelectInput";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { CustomSwitchInput } from "components/layout/SwitchInput";
import { CustomDatePicker } from "components/layout/DatePicker";
import { EditPagoSchema } from "validators/pago";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { useSnackBarContext } from "context/SnackBarContext";
import { usePagoMenuContext } from "context/PagosMenuContext";
import { useEditPago, usePago } from "hooks";

type PagoParams = {
  pago: string;
};

type FormValues = {
  scoutId: string;
  fechaPago: Date;
  concepto: string;
  metodoPago: string;
  monto: string;
  rendido: boolean;
};

export default function PagoPage() {
  const theme = useTheme();
  const { pago: pagoId } = useLocalSearchParams<PagoParams>();
  if (!pagoId) return null;

  const { toogleSnackBar } = useSnackBarContext();
  const { data, isLoading } = usePago(pagoId);
  const { mutateAsync, isPending } = useEditPago();
  const { goBack } = useNavigation();
  const {
    metodoPago: { metodosPagoList },
  } = usePagoMenuContext();

  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(EditPagoSchema),
    values: {
      concepto: data?.concepto ?? "",
      monto: data?.monto ?? "",
      scoutId: data?.scoutId ?? "",
      metodoPago: data?.metodoPago ?? "",
      rendido: !!data?.rendido,
      fechaPago: new Date(data?.fechaPago || 0),
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

      <DescriptiveText
        title="  Nombre"
        description={
          data?.scout ? `${data.scout?.apellido} ${data.scout?.nombre}` : "-"
        }
      />

      <Divider style={{ marginVertical: 10 }} />
      <FormProvider {...formMethods}>
        <CustomTextInput
          name="concepto"
          label="Concepto"
          placeholder="Ingrese concepto"
        />
        <CustomTextInput
          name="monto"
          label="Monto"
          placeholder="Ingrese monto"
        />

        <CustomDatePicker name="fechaPago" label="Fecha de pago" />

        <CustomDropDown
          name="metodoPago"
          label="Metodo de pago"
          list={metodosPagoList}
        />

        <CustomSwitchInput name="rendido" label="Pago rendido" />

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
