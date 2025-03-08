import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useDebouncedValue } from "hooks/useDebounceValue";
import UsersList from "components/users/UsersList";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { NotificationsBell } from "components/layout/NotificationsBell";

export default function Users() {
  const theme = useTheme();
  const { dispatch, getState } = useNavigation();
  const onChangeSearch = (searchText: string) => {
    setsearchQuery(searchText);
  };

  const [searchQuery, setsearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery);

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
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          <Appbar.Content title="Usuarios" />

          <NotificationsBell />

          <Appbar.Action
            icon="plus"
            onPress={() => {
              dispatch({
                ...CommonActions.navigate("newUser"),
                target: getState().key,
              });
            }}
          />
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

          <UsersList searchQuery={debouncedSearchQuery} />
        </View>
      </SafeAreaView>
    </>
  );
}
