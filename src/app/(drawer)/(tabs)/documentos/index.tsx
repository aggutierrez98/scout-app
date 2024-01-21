import { Searchbar, useTheme } from "react-native-paper";
import { useDebouncedValue } from "hooks/useDebounceValue";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import DocumentsList from "components/documentos/DocumentsList";

export default function documentos() {
  const theme = useTheme();
  const onChangeSearch = (searchText: string) => {
    setsearchQuery(searchText);
  };
  const [searchQuery, setsearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery);

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          padding: 10,
          paddingTop: -40,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <DocumentsList searchQuery={debouncedSearchQuery} />
    </SafeAreaView>
  );
}
