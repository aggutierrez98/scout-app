import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useDebouncedValue } from "hooks/useDebounceValue";
import FamiliaresList from "components/familiares/FamiliaresList";

export default function Familiares() {
  const theme = useTheme();
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
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <Appbar.Content title="Familiares" />
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

          <FamiliaresList searchQuery={debouncedSearchQuery} />
        </View>
      </SafeAreaView>
    </>
  );
}
