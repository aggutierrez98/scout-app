import { View, ViewStyle, TextStyle } from "react-native";
import { useController } from "react-hook-form";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";
import { HelperText, useTheme } from "react-native-paper";

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
  multi?: boolean
}

export const CustomDropDown = ({
  name,
  label,
  list,
  multi = false,
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
  } = useController({ name, defaultValue: multi ? [] : "" });

  const theme = useTheme();

  const handleDDChange = (value: string) => {
    if (multi) field.onChange(value.split(",").filter(val => val !== ""));
    else field.onChange(value)
    setShowDropDown(false)
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
        value={multi ? field.value?.join(",") : field.value}
        setValue={handleDDChange}
        list={list}
        dropDownStyle={dropDownStyle}
        dropDownItemSelectedStyle={dropDownItemSelectedStyle}
        dropDownItemSelectedTextStyle={dropDownItemSelectedTextStyle}
        dropDownItemStyle={dropDownItemStyle}
        dropDownItemTextStyle={{
          color: theme.colors.onPrimary,
          ...dropDownItemTextStyle,
        }}
        multiSelect={multi}
      />
      <HelperText type="error" visible={hasError}>
        {error?.message?.toString()}
      </HelperText>
    </View>
  );
};
