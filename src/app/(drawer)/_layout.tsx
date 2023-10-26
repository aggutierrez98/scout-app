import { Redirect } from "expo-router";
import {
  Divider,
  Drawer as RNPDrawer,
  Text,
  useTheme,
  withTheme,
} from "react-native-paper";
import { useLogout, useRenewLogin } from "client/auth";
import Drawer from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoIcon from "components/layout/AppLogoIcon";
import { View } from "react-native";
import { CommonActions } from "@react-navigation/native";

function AppLayout() {
  const { colors } = useTheme();
  const { data: userData } = useRenewLogin();
  const logout = useLogout();

  if (!userData) return <Redirect href="/" />;

  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
          swipeEdgeWidth: 100,
        }}
        drawerContent={({ state: { routes, key, index }, navigation }) => (
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: colors.background,
              justifyContent: "space-between",
            }}
          >
            <RNPDrawer.Section>
              <View style={{ alignItems: "center" }}>
                <LogoIcon />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 10,
                  }}
                >
                  Scouts App
                </Text>
              </View>
              <Divider style={{ marginVertical: 10 }} />
              <RNPDrawer.Item
                key={"home"}
                label={"Scouts"}
                icon={"home"}
                onPress={() => {
                  navigation.dispatch({
                    ...CommonActions.navigate(routes[0].name, routes[0].params),
                    target: key,
                  });
                }}
                active={index === 0}
              />
              <RNPDrawer.Item
                key={"user"}
                label={userData.username}
                icon={"account-circle"}
                onPress={() => {
                  navigation.dispatch({
                    ...CommonActions.navigate(routes[1].name, routes[1].params),
                    target: key,
                  });
                }}
                active={index === 1}
              />
              {userData.role === "ADMIN" && (
                <RNPDrawer.Item
                  key={"users"}
                  label={"Usuarios"}
                  icon={"account-group"}
                  onPress={() => {
                    navigation.dispatch({
                      ...CommonActions.navigate(
                        routes[2].name,
                        routes[2].params
                      ),
                      target: key,
                    });
                  }}
                  active={index === 2}
                />
              )}
            </RNPDrawer.Section>
            <RNPDrawer.Section style={{ flexDirection: "column-reverse" }}>
              <RNPDrawer.Item
                key={"logout"}
                label={"Cerrar sesion"}
                icon={"logout"}
                onPress={() => {
                  logout();
                }}
              />
            </RNPDrawer.Section>
          </SafeAreaView>
        )}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Scouts",
          }}
        />
        <Drawer.Screen
          name="user"
          options={{
            drawerLabel: "User",
          }}
        />
        <Drawer.Screen
          name="users"
          options={{
            drawerLabel: "Users",
          }}
        />
      </Drawer>
    </>
  );
}

export default withTheme(AppLayout);
