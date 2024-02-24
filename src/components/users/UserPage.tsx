import { ScrollView } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VALID_ROLES } from "utils/constants";
import { CustomDropDown } from "components/layout/SelectInput";
import { DescriptiveText } from "components/layout/DescriptiveText";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { StatusBar } from "expo-status-bar";
import { CustomSwitchInput } from "components/layout/SwitchInput";
import { EditUserSchema } from "validators/auth";
import { useSnackBarContext } from "context/SnackBarContext";
import { useModifyUser, useUser } from "hooks";

type UserParams = {
  user: string;
};

type FormValues = {
  role: typeof VALID_ROLES;
  active: boolean;
};

const rolList = VALID_ROLES.map((role) => ({
  label: role,
  value: role,
}));

export default function UserPage() {
  const { toogleSnackBar } = useSnackBarContext();
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { user: userId } = useLocalSearchParams<UserParams>();
  if (!userId) return null;
  const { data, isLoading } = useUser(userId);
  const { mutateAsync } = useModifyUser();

  const formMethods = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(EditUserSchema),
    values: {
      active: data?.active ?? false,
      role: (data?.role as unknown as typeof VALID_ROLES) ?? "",
    },
  });

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          padding: 10,
          paddingTop: 0,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <StatusBar style="auto" />
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.background,
          height: 40,
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Appbar.BackAction
          onPress={() => {
            goBack();
          }}
        />

        <Appbar.Content style={{ marginLeft: 10 }} title={data?.username} />
      </Appbar.Header>

      {isLoading && <LoadingScreen />}

      <Avatar.Text
        style={{ alignSelf: "center", marginVertical: 20 }}
        size={120}
        label={data?.username.slice(0, 2).toLocaleUpperCase() ?? ""}
      />
      <Divider style={{ marginBottom: 10 }} />

      {data?.scout ? (
        <>
          <Text style={{ fontSize: 25 }}>
            {data?.scout.apellido ?? ""} {data?.scout.nombre ?? ""}
          </Text>

          <Divider style={{ marginBottom: 10 }} />

          <DescriptiveText title="DNI" description={data?.scout.dni ?? ""} />
          <DescriptiveText
            title="Funcion"
            description={data?.scout.funcion ?? ""}
          />
        </>
      ) : (
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          El usuario no tiene asociado un scout
        </Text>
      )}

      <Divider style={{ marginVertical: 10 }} />

      <FormProvider {...formMethods}>
        <CustomDropDown name="role" label="Rol" list={rolList} />

        <CustomSwitchInput name="active" label="Usuario activo" />

        <Button
          icon="send"
          mode="contained"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={{ marginTop: 20 }}
          onPress={formMethods.handleSubmit(async (data) => {
            const resp = await mutateAsync({ data, id: userId });

            if (resp) {
              toogleSnackBar("Usuario modificado con exito!", "success");
              goBack();
            } else toogleSnackBar("Error al modificar el usuario", "error");
          })}
        >
          Guardar
        </Button>
      </FormProvider>
    </ScrollView>
  );
}
