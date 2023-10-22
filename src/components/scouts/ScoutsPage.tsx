import { useDebouncedValue } from "hooks/useDebounceValue";
import ScoutsList from "../../components/scouts/ScoutsList";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

export default function ScoutsPage() {
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
          paddingTop: 0,
          backgroundColor: theme.colors.backdrop,
        },
      ]}
    >
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          height: 55,
        }}
      />

      <ScoutsList searchQuery={debouncedSearchQuery} />
    </SafeAreaView>
  );
}
