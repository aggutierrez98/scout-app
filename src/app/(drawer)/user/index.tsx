import { Appbar, Avatar, Divider, useTheme } from "react-native-paper";
import { ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { DescriptiveText } from "components/layout/DescriptiveText";

export default function user() {
  const theme = useTheme();
  const { data, isLoading } = useRenewLogin();

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
          }}
        >
          <Appbar.Content title={data?.username} />
        </Appbar.Header>

        {isLoading && <LoadingScreen />}

        {data && (
          <ScrollView
            style={[
              {
                flex: 1,
                padding: 10,
                paddingTop: 0,
              },
            ]}
          >
            <Avatar.Text
              style={{ alignSelf: "center", marginVertical: 20 }}
              size={140}
              label={data.username.slice(0, 2).toLocaleUpperCase()}
            />
            <Divider style={{ marginBottom: 10 }} />

            <DescriptiveText
              title="Nombre"
              description={`${data.scout.apellido} ${data.scout.nombre}`}
            />
            <DescriptiveText title="ROL" description={data.role} />
            <DescriptiveText title="Funcion" description={data.scout.funcion} />

            <Divider style={{ marginVertical: 10 }} />

            <DescriptiveText title="DNI" description={data.scout.dni} />
            <DescriptiveText
              title="Edad"
              description={`${data.scout.edad} Años`}
            />
            <DescriptiveText
              title="Sexo"
              description={data.scout.sexo === "M" ? "Masculino" : "Femenino"}
            />
            <DescriptiveText title="Mail" description={data.scout.mail} />
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}
