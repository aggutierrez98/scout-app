import { Appbar, Portal, Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useRef, useState } from "react";
import { useDebouncedValue } from "hooks/useDebounceValue";
import { useNavigation } from "expo-router";
import EntregasList from "components/entregas/EntregasList";
import FiltersMenu from "components/FiltersMenu";
import { useMenuContext } from "context/MenuContext";
import { CommonActions } from "@react-navigation/native";

export default function entregas() {
  const theme = useTheme();
  const { data } = useRenewLogin();
  const { dispatch } = useNavigation();
  const onChangeSearch = (searchText: string) => {
    setsearchQuery(searchText);
  };

  const [searchQuery, setsearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const touchable = useRef(null);
  const { toogleMenu } = useMenuContext();

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
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          <Appbar.Content title="Entregas" />

          <Appbar.Action
            icon="chevron-down"
            onPressIn={() => toogleMenu(true, "entregas")}
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

          <FiltersMenu parentRef={touchable} />
        </Appbar.Header>

        {data ? (
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
        ) : (
          <LoadingScreen />
        )}
      </SafeAreaView>
    </>
  );
}
