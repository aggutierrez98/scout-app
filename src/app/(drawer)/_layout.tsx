import { Redirect } from "expo-router";
import {
  Divider,
  Drawer as RNPDrawer,
  Snackbar,
  Text,
  useTheme,
  withTheme,
} from "react-native-paper";
import { useLogout, useRenewLogin } from "hooks";
import Drawer from "expo-router/drawer";
import LogoIcon from "components/layout/AppLogoIcon";
import { View, SafeAreaView } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useSnackBarContext } from "context/SnackBarContext";
import { EditProvider } from "context/EditContext";
import { PagoProvider } from "context/PagosContext";
import { DocumentoProvider } from "context/DocumentoContext";
import { EntregaProvider } from "context/EntregaContext";
import { ScoutMenuProvider } from "context/ScoutsMenuContext";
import { PagoMenuProvider } from "context/PagosMenuContext";
import { DocumentosMenuProvider } from "context/DocumentosMenuContext";
import { EntregaMenuProvider } from "context/EntregasMenuContext";

function AppLayout() {
  const { snackBarText, snackBarMode, visibleSnack, onDismissSnackBar } =
    useSnackBarContext();
  const { colors } = useTheme();
  const { data: userData } = useRenewLogin();
  const logout = useLogout();

  if (!userData) return <Redirect href="/" />;

  return (
    <>
      <EditProvider>
        <PagoProvider>
          <DocumentoProvider>
            <EntregaProvider>
              <ScoutMenuProvider>
                <PagoMenuProvider>
                  <DocumentosMenuProvider>
                    <EntregaMenuProvider>
                      <Drawer
                        screenOptions={{
                          headerShown: false,
                          swipeEdgeWidth: 100,
                        }}
                        drawerContent={({
                          state: { routes, key, index },
                          navigation,
                        }) => (
                          <SafeAreaView
                            style={{
                              flex: 1,
                              paddingTop: 60,
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
                                    ...CommonActions.navigate(
                                      routes[0].name,
                                      routes[0].params
                                    ),
                                    target: key,
                                  });
                                }}
                                active={index === 0}
                              />
                              <RNPDrawer.Item
                                key={"entregas"}
                                label={"Entregas"}
                                icon={"medal"}
                                onPress={() => {
                                  navigation.dispatch({
                                    ...CommonActions.navigate(
                                      routes[1].name,
                                      routes[1].params
                                    ),
                                    target: key,
                                  });
                                }}
                                active={index === 1}
                              />
                              <RNPDrawer.Item
                                key={"familiares"}
                                label={"Familiares"}
                                icon={"account-child"}
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
                              {userData.role === "ADMIN" && (
                                <RNPDrawer.Item
                                  key={"users"}
                                  label={"Usuarios"}
                                  icon={"account-group"}
                                  onPress={() => {
                                    navigation.dispatch({
                                      ...CommonActions.navigate(
                                        routes[3].name,
                                        routes[3].params
                                      ),
                                      target: key,
                                    });
                                  }}
                                  active={index === 3}
                                />
                              )}
                              <RNPDrawer.Item
                                key={"user"}
                                label={userData.username}
                                icon={"account-circle"}
                                onPress={() => {
                                  navigation.dispatch({
                                    ...CommonActions.navigate(
                                      routes[4].name,
                                      routes[4].params
                                    ),
                                    target: key,
                                  });
                                }}
                                active={index === 4}
                              />
                            </RNPDrawer.Section>
                            <RNPDrawer.Section
                              style={{ flexDirection: "column-reverse" }}
                            >
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
                          name="entregas"
                          options={{
                            drawerLabel: "Entregas",
                          }}
                        />
                        <Drawer.Screen
                          name="familiares"
                          options={{
                            drawerLabel: "Familiares",
                          }}
                        />
                        <Drawer.Screen
                          name="users"
                          options={{
                            drawerLabel: "Users",
                          }}
                        />
                        <Drawer.Screen
                          name="user"
                          options={{
                            drawerLabel: "User",
                          }}
                        />
                      </Drawer>

                      <Snackbar
                        visible={visibleSnack}
                        rippleColor={colors.onPrimary}
                        onDismiss={onDismissSnackBar}
                        duration={2000}
                        elevation={1}
                        style={{
                          borderColor:
                            snackBarMode === "error"
                              ? colors.onError
                              : colors.onTertiary,
                          borderWidth: 1,
                          marginBottom: 15,
                        }}
                        action={{
                          label: "Cerrar",
                          textColor:
                            snackBarMode === "error"
                              ? colors.onError
                              : colors.onTertiary,
                          onPress: () => {
                            onDismissSnackBar();
                          },
                        }}
                      >
                        {snackBarText}
                      </Snackbar>
                    </EntregaMenuProvider>
                  </DocumentosMenuProvider>
                </PagoMenuProvider>
              </ScoutMenuProvider>
            </EntregaProvider>
          </DocumentoProvider>
        </PagoProvider>
      </EditProvider>
    </>
  );
}

export default withTheme(AppLayout);
