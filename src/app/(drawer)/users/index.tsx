import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useState } from "react";
import { useDebouncedValue } from "hooks/useDebounceValue";
import UsersList from "components/auth/UsersList";

export default function users() {
  const theme = useTheme();
  const { data } = useRenewLogin();
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
            backgroundColor: theme.colors.backdrop,
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
          <Appbar.Content title="Usuarios" />
        </Appbar.Header>

        {data ? (
          <ScrollView
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
          </ScrollView>
        ) : (
          <LoadingScreen />
        )}
      </SafeAreaView>
    </>
  );
}
