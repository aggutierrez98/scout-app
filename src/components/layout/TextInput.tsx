import { View, StyleSheet } from "react-native";
import { useController, UseControllerProps } from "react-hook-form";
import {
  Button,
  HelperText,
  TextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props extends TextInputProps, UseControllerProps {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: undefined;
  hidden?: boolean;
}

export const CustomTextInput = ({
  name,
  label,
  rules,
  placeholder,
  hidden,
  ...inputProps
}: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules });

  const { colors } = useTheme();
  const hasError = Boolean(!!error);
  const [hidePass, setHidePass] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        textAlign="left"
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        label={label}
        placeholder={placeholder}
        error={hasError}
        style={{ backgroundColor: colors.background, ...styles.input }}
        outlineStyle={{}}
        secureTextEntry={hidden && hidePass}
        {...inputProps}
      />
      <HelperText style={styles.errorText} type="error" visible={hasError}>
        {error?.message?.toString()}
        {/* {name} ingresado es invalido */}
      </HelperText>

      {hidden && (
        <Button
          style={{ position: "absolute", right: 0, top: 20 }}
          onPress={() => setHidePass(!hidePass)}
        >
          <Icon name={hidePass ? "eye" : "eye-off"} size={20} />
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: -1,
    // justifyContent: "center",
    // padding: 8,
    // backgroundColor: "#0e101c",
    // borderColor: "white",
    // borderWidth: 1,
  },
  input: {
    height: 50,
    marginBottom: -15,
    marginTop: 0,
    // backgroundColor: "white",
    // borderColor: "none",
    // height: 40,
    // padding: 10,
    // borderRadius: 4,
  },
  errorText: {
    // flex: -1,
    // height: 25,
  },
});
