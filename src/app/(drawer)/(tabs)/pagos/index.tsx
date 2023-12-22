import PagosList from "components/pagos/PagosList";
import { useDebouncedValue } from "hooks/useDebounceValue";
import { useState } from "react";
import { View, Text } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

export default function pagos() {
  const theme = useTheme();
  const onChangeSearch = (searchText: string) => {
    setsearchQuery(searchText);
  };
  const [searchQuery, setsearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery);

  return (
    <View
      style={[
        {
          flex: 1,
          padding: 10,
          backgroundColor: theme.colors.backdrop,
        },
      ]}
    >
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <PagosList searchQuery={debouncedSearchQuery} />
    </View>
  );
}
