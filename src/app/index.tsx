import App from "../components/App";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function Page() {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        { backgroundColor: theme.colors.backdrop },
      ]}
    >
      <Stack.Screen
        options={{
          title: "Home",
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text>Home Screen</Text>

      <App />
    </View>
  );
}
