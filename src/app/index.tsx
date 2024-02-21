import { useRenewLogin } from "client/auth";
import LoginForm from "components/auth/LoginForm";
import LogoIcon from "components/layout/AppLogoIcon";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { Redirect, Stack } from "expo-router";
import { View, SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  const { isLoading, data: userData } = useRenewLogin();

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Stack.Screen
        options={{
          title: "Login",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      {isLoading && <LoadingScreen />}

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <LogoIcon width={100} height={100} />
          <Text
            style={{
              fontSize: 40,
              fontFamily: "notoserif",
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Scouts App
          </Text>
        </View>

        {userData ? <Redirect href="/(drawer)/(tabs)/scouts" /> : <LoginForm />}
      </View>
    </SafeAreaView>
  );
}
