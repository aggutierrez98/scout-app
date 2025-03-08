import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { useDebouncedValue } from "hooks/useDebounceValue";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import EntregasList from "components/familiares/EntregasList";
// import { useEntregaMenuContext } from "context/EntregasMenuContext";
import { useMenuContext } from "context/MenuContext";
import FiltersMenu from "components/shared/FiltersMenu";
import { NotificationsBell } from "components/layout/NotificationsBell";

export default function Entregas() {
  const theme = useTheme();
  const { dispatch } = useNavigation();
  const onChangeSearch = (searchText: string) => {
    setsearchQuery(searchText);
  };

  const [searchQuery, setsearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const touchable = useRef(null);
  const { toogleMenu } = useMenuContext()

  return (
    <>
      <SafeAreaView
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
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <Appbar.Content title="Entregas" />

          <NotificationsBell />

          <Appbar.Action
            icon="chevron-down"
            onPressIn={() => toogleMenu()}
            ref={touchable}
          />

          <Appbar.Action
            icon="plus"
            onPress={() => {
              dispatch(
                CommonActions.navigate({
                  name: "newEntrega",
                })
              );
            }}
          />

          <FiltersMenu parentRef={touchable} section="entregas" />
        </Appbar.Header>


        <View
          style={[
            {
              flex: 1,
              padding: 10,
            },
          ]}
        >
          <Searchbar
            placeholder="Buscar"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <EntregasList searchQuery={debouncedSearchQuery} />
        </View>
      </SafeAreaView>
    </>
  );
}
