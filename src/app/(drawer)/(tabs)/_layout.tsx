import {
  Tabs,
  useNavigation,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router";
import { Appbar, BottomNavigation, useTheme } from "react-native-paper";
import { useRef } from "react";
import { View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { useEditContext } from "context/EditContext";
import { MenuProvider } from "context/MenuContext";
import { AppBarAction } from '../../../components/shared/AppBarAction';
import FiltersMenu from "components/shared/FiltersMenu";
import { DialogProvider } from "context/DialogContext";

export default function AppLayout() {
  const theme = useTheme();
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const segments = useSegments();
  const pathname = usePathname();
  const pageTitle = pathname.split("/")[1];
  const { dispatch } = useNavigation();
  const { changeIsEditing } = useEditContext();
  const touchableScouts = useRef(null);
  const touchablePagos = useRef(null);
  const touchableDocumentos = useRef(null);
  const { back } = useRouter();


  return (
    <>
      <DialogProvider >
        <MenuProvider>
          <StatusBar style="auto" />
          <Appbar.Header
            style={{
              backgroundColor: theme.colors.background,
              height: 40,
              marginBottom: 10,
              marginVertical: 10,
            }}
          >
            {segments.length > 3 && (
              <Appbar.BackAction
                onPress={() => {
                  back();
                }}
              />
            )}
            <Appbar.Content title={capitalizeFirstLetter(pageTitle)} />

            {segments.length === 3 && pageTitle !== "scouts" && (
              <Appbar.Action
                icon="plus"
                onPress={() => {
                  if (pageTitle === "pagos") {
                    dispatch(
                      CommonActions.navigate({
                        name: "newPago",
                      })
                    );
                  }
                  if (pageTitle === "documentos") {
                    dispatch(
                      CommonActions.navigate({
                        name: "newDocumento",
                      })
                    );
                  }
                }}
              />
            )}
            {segments.length > 3 && pageTitle === "scouts" && (
              <Appbar.Action
                icon="pencil-circle"
                size={35}
                onPress={() => changeIsEditing()}
              />
            )}
            {segments.length === 3 &&
              (pageTitle === "scouts" ? (
                <>
                  <AppBarAction
                    touchable={touchableScouts}
                  />
                  <FiltersMenu parentRef={touchableScouts}
                    section="scouts"
                  />
                </>
              ) : pageTitle === "pagos" ? (
                <>
                  <AppBarAction
                    touchable={touchablePagos}
                  />
                  <FiltersMenu parentRef={touchablePagos}
                    section="pagos"
                  />
                </>
              ) : pageTitle === "documentos" ? (
                <>
                  <AppBarAction
                    touchable={touchableDocumentos}
                  />
                  <FiltersMenu parentRef={touchableDocumentos}
                    section="documentos"
                  />
                </>
              ) : (
                <></>
              ))}
          </Appbar.Header>
          <Tabs
            screenOptions={{
              headerShown: false,
            }}
            tabBar={({ navigation, state }) => {
              const stateFin = {
                ...state,
                routes: state.routes.filter((rn) => rn.name !== "TabsLayout"),
              };

              return (
                <View>
                  <BottomNavigation.Bar
                    style={{
                      backgroundColor: theme.colors.background,
                      // borderTopColor: theme.colors.tertiary,
                      borderTopWidth: 0.2,
                    }}
                    navigationState={stateFin}
                    onTabPress={({ route, preventDefault }) => {
                      const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                      });

                      if (event.defaultPrevented) {
                        preventDefault();
                      } else {
                        navigation.dispatch({
                          ...CommonActions.navigate(route.name, route.params),
                          target: state.key,
                        });
                      }
                    }}
                    renderIcon={({ route, color }) => {
                      const icons: { [s: string]: string } = {
                        scouts: "badge-account-horizontal-outline",
                        pagos: "cash-multiple",
                        documentos: "file-document-outline",
                      };
                      return (
                        <Icon name={icons[route.name]} size={25} color={color} />
                      );
                    }}
                    getLabelText={({ route }) => {
                      return capitalizeFirstLetter(route.name);
                    }}
                  />
                </View>
              );
            }}
          >
            <Tabs.Screen
              name="scouts"
              options={{
                href: "scouts",
              }}
            />
            <Tabs.Screen
              name="documentos"
              options={{
                href: "documentos",
              }}
            />
            <Tabs.Screen
              name="pagos"
              options={{
                href: "pagos",
              }}
            />
          </Tabs>
        </MenuProvider>
      </DialogProvider>

    </>

  );
}
