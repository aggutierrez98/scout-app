import { Searchbar, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebouncedValue } from "hooks/useDebounceValue";
import { useState } from "react";
import ScoutsList from "components/scouts/ScoutsList";

export default function pago() {
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
          backgroundColor: theme.colors.backdrop,
        },
      ]}
    >
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <ScoutsList searchQuery={debouncedSearchQuery} />
    </SafeAreaView>
  );
}
