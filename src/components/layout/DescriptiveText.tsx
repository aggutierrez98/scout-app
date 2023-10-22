import { View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  title: string;
  description?: string | null;
}

export const DescriptiveText = ({ title, description }: Props) => {
  return (
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end" }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}: </Text>
      <Text style={{ fontSize: 18 }}>{description ?? "-"}</Text>
    </View>
  );
};
