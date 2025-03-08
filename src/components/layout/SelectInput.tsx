import { View, ViewStyle, TextStyle } from "react-native";
import { useController } from "react-hook-form";
import { Dropdown, MultiSelectDropdown } from "react-native-paper-dropdown";
import { HelperText, Text, useTheme } from "react-native-paper";

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
  dropDownContainerStyle,
}: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, defaultValue: "" });

  const handleDDChange = (value?: string | string[]) => {
    field.onChange(value);
  };
  const hasError = Boolean(!!error);

  return (
    <View style={{ marginVertical: 7, ...dropDownContainerStyle }}>
      {multi ?
        <MultiSelectDropdown
          menuContentStyle={{
            paddingTop: 0,
            ...dropDownStyle,
          }}
          label={label}
          placeholder={placeholder}
          mode={"outlined"}
          options={list}
          value={field.value}
          onSelect={handleDDChange}
        />
        :

        <Dropdown
          label={label}
          placeholder={placeholder}
          mode={"outlined"}
          options={list}
          value={field.value}
          onSelect={handleDDChange}
        />
      }

      <HelperText type="error" visible={hasError}>
        {error?.message?.toString()}
      </HelperText>
    </View>
  );
};
