import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useController } from "react-hook-form";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue: string;
  list: {
    label: string;
    value: string;
  }[];
  dropDownStyle?: ViewStyle;
  dropDownItemSelectedStyle?: ViewStyle;
  dropDownItemSelectedTextStyle?: TextStyle;
  dropDownItemStyle?: ViewStyle;
  dropDownItemTextStyle?: TextStyle;
}

export const CustomDropDown = ({
  name,
  label,
  list,
  placeholder,
  defaultValue,
  dropDownStyle,
  dropDownItemSelectedStyle,
  dropDownItemSelectedTextStyle,
  dropDownItemStyle,
  dropDownItemTextStyle,
}: Props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { field } = useController({ name, defaultValue });

  const handleDDChange = (value: string) => {
    field.onChange(value);
  };

  return (
    <View style={{ marginVertical: 7 }}>
      <DropDown
        label={label}
        placeholder={placeholder}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={field.value}
        setValue={handleDDChange}
        list={list}
        dropDownStyle={dropDownStyle}
        dropDownItemSelectedStyle={dropDownItemSelectedStyle}
        dropDownItemSelectedTextStyle={dropDownItemSelectedTextStyle}
        dropDownItemStyle={dropDownItemStyle}
        dropDownItemTextStyle={{
          ...defaultStyle.itemTextStyle,
          ...dropDownItemTextStyle,
        }}
      />
    </View>
  );
};

const defaultStyle = StyleSheet.create({
  itemTextStyle: {
    color: "white",
  },
});
