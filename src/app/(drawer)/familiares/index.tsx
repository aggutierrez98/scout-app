import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRenewLogin } from "client/auth";
import { LoadingScreen } from "components/layout/LoadingScreen";
import { useState } from "react";
import { useDebouncedValue } from "hooks/useDebounceValue";
import { useNavigation } from "expo-router";
import FamiliaresList from "components/familiares/FamiliaresList";

export default function familiares() {
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
          <Appbar.Content title="Familiares" />
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

            <FamiliaresList searchQuery={debouncedSearchQuery} />
          </View>
        ) : (
          <LoadingScreen />
        )}
      </SafeAreaView>
    </>
  );
}
