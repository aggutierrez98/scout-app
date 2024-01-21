import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useController } from "react-hook-form";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";
import { HelperText } from "react-native-paper";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  list: {
    label: string;
    value: string;
  }[];
  dropDownStyle?: ViewStyle;
  dropDownItemSelectedStyle?: ViewStyle;
  dropDownItemSelectedTextStyle?: TextStyle;
  dropDownItemStyle?: ViewStyle;
  dropDownItemTextStyle?: TextStyle;
  dropDownContainerStyle?: ViewStyle;
}

export const CustomDropDown = ({
  name,
  label,
  list,
  placeholder,
  dropDownStyle,
  dropDownItemSelectedStyle,
  dropDownItemSelectedTextStyle,
  dropDownItemStyle,
  dropDownItemTextStyle,
  dropDownContainerStyle,
}: Props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const handleDDChange = (value: string) => {
    field.onChange(value);
  };
  const hasError = Boolean(!!error);

  return (
    <View style={{ marginVertical: 7, ...dropDownContainerStyle }}>
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
      <HelperText type="error" visible={hasError}>
        {error?.message?.toString()}
        {/* {name} ingresado es invalido */}
      </HelperText>
    </View>
  );
};

const defaultStyle = StyleSheet.create({
  itemTextStyle: {
    color: "white",
  },
});
