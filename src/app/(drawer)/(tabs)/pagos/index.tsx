import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function pagos() {
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
    >
      <Text>Pagos</Text>
    </View>
  );
}
