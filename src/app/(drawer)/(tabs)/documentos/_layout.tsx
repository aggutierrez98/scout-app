import { Stack } from "expo-router/stack";
import { View, useColorScheme } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { Tabs } from "expo-router/tabs";

export default function Layout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        animationDuration: 50,
      }}
    />
  );
}
