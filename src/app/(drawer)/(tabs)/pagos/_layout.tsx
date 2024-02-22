import { Stack } from "expo-router/stack";
import { useTheme } from "react-native-paper";

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
