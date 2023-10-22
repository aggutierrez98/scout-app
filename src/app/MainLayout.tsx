import { View } from "react-native";
import { useRef } from "react";
import { Appbar, BottomNavigation, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Tabs, useNavigation, usePathname, useSegments } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMenuContext } from "../context/MenuContext";
import FiltersMenu from "../components/FiltersMenu";
import { useEditContext } from "../context/EditContext";

export default function MainLayout() {
  const theme = useTheme();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const segments = useSegments();
  const pathname = usePathname();
  const pageTitle = pathname.split("/")[1];
  const { goBack } = useNavigation();
  const { toogleMenu } = useMenuContext();
  const { changeIsEditing } = useEditContext();
  const touchable = useRef(null);

  return (
    <>
      <StatusBar style="auto" />
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.background,
          height: 40,
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        {segments.length > 1 && (
          <Appbar.BackAction
            onPress={() => {
              goBack();
            }}
          />
        )}

        <Appbar.Content
          title={pageTitle?.length ? capitalizeFirstLetter(pageTitle) : "Home"}
        />
        {segments.length > 1 && (
          <Appbar.Action icon="pencil" onPress={() => changeIsEditing()} />
        )}
        {pageTitle?.length && segments.length === 1 && (
          <Appbar.Action icon="plus" onPress={() => {}} />
        )}
        {segments.length === 1 && (
          <Appbar.Action
            icon="chevron-down"
            onPressIn={() => toogleMenu()}
            ref={touchable}
          />
        )}
        <FiltersMenu parentRef={touchable} />
      </Appbar.Header>

      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        sceneContainerStyle={{
          position: "relative",
        }}
        tabBar={({ navigation, state, descriptors, insets }) => {
          const stateFin = {
            ...state,
            routes: state.routes.filter(
              (rn) =>
                rn.name !== "_sitemap" &&
                rn.name !== "[...404]" &&
                rn.name !== "MainLayout"
            ),
          };

          return (
            <View>
              <BottomNavigation.Bar
                style={{
                  backgroundColor: theme.colors.backdrop,
                }}
                navigationState={stateFin}
                safeAreaInsets={insets}
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
                renderIcon={({ route, focused, color }) => {
                  const { options } = descriptors[route.key];
                  if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                  }

                  if (route.name === "index")
                    return <Icon name="home-outline" size={25} color={color} />;
                  if (route.name === "Pagos")
                    return (
                      <Icon name="cash-multiple" size={25} color={color} />
                    );
                  if (route.name === "Scouts")
                    return (
                      <Icon
                        name="badge-account-horizontal-outline"
                        size={25}
                        color={color}
                      />
                    );
                  if (route.name === "Documentos")
                    return (
                      <Icon
                        name="file-document-outline"
                        size={25}
                        color={color}
                      />
                    );

                  return null;
                }}
                getLabelText={({ route }) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : route.name ?? "";

                  return label as string;
                }}
              />
            </View>
          );
        }}
      />
    </>
  );
}
