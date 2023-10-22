import ScoutsList from "../../components/scouts/ScoutsList";
import { Stack, router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Scouts() {
  const theme = useTheme();
  // const { bottom } = useSafeAreaInsets();
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
