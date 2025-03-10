import { Appbar, Button, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect, useNavigation } from "expo-router";
import { CustomDropDown } from "components/layout/SelectInput";
import { useAllScouts, useCreateEntrega } from "hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEntregaSchema } from "validators/entrega";
import { CustomDatePicker } from "components/layout/DatePicker";
import { useSnackBarContext } from "context/SnackBarContext";
import { useMenuContext } from "context/MenuContext";
import CustomSearchableDropdown from 'components/layout/CustomSearchableDropdown';

type FormValues = {
  scoutId: string;
  fechaEntrega: Date;
  tipoEntrega: string;
};

export default function NewEntrega() {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { toogleSnackBar } = useSnackBarContext();
  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(CreateEntregaSchema),
  });

  const { isSuccess, isPending, mutateAsync } = useCreateEntrega();
  const { data: users } = useAllScouts();
  const {
    tipoEntrega: { tipoEntregaList },
  } = useMenuContext();

  if (isSuccess) {
    return <Redirect href="/(drawer)/entregas" />;
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
        <Appbar.Header
          style={{
            backgroundColor: theme.colors.background,
            height: 40,
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <Appbar.BackAction
            onPress={() => {
              goBack();
            }}
          />
          <Appbar.Content title="Nueva entrega" />
        </Appbar.Header>

        <ScrollView
          style={[
            {
              flex: 1,
              padding: 10,
            },
          ]}
        >
          {isPending && <LoadingScreen />}

          <FormProvider {...formMethods}>
            <CustomDropDown
              name="tipoEntrega"
              label="Tipo de entrega"
              list={tipoEntregaList}
            />

            <CustomSearchableDropdown
              name="scoutId"
              label="Scout asociado"
              list={scoutsList}
            />

            <CustomDatePicker name="fechaEntrega" label="Fecha de entrega" />

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
                if (resp)
                  toogleSnackBar("Entrega creado con exito!", "success");
                else toogleSnackBar("Error al crear entrega", "error");
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
