import { View, ViewStyle } from 'react-native';
import { Text } from "react-native-paper";

interface Props {
  title: string;
  description?: string | null;
  style?: ViewStyle
}

export const DescriptiveText = ({ title, description, style }: Props) => {
  return (
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end", ...style }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}: </Text>
      <Text style={{ fontSize: 18 }}>{description || "-"}</Text>
    </View>
  );
};
