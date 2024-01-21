import { View, StyleSheet } from "react-native";
import { useController } from "react-hook-form";
import { Switch, Text } from "react-native-paper";

interface Props {
  name: string;
  label: string;
}

export const CustomSwitchInput = ({ name, label }: Props) => {
  const { field } = useController({ name });
  const handleSwitchChange = (value: boolean) => {
    field.onChange(value);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingBottom: 2,
          marginHorizontal: 10,
        }}
      >
        {label}:
      </Text>
      <Switch value={field.value} onValueChange={handleSwitchChange} />
    </View>
  );
};

const defaultStyle = StyleSheet.create({
  itemTextStyle: {
    color: "white",
  },
});
