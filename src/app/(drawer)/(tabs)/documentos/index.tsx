import ScoutsList from "components/scouts/ScoutsList";
import { Stack, router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export default function documentos() {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          padding: 10,
          backgroundColor: theme.colors.backdrop,
        },
      ]}
    ></View>
  );
}
