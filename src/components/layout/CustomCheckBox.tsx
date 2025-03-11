import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { View } from "react-native";
import { Checkbox, CheckboxItemProps, HelperText } from "react-native-paper";

interface Props extends Omit<CheckboxItemProps, "status">, UseControllerProps {
    label: string;
    name: string;
    defaultValue?: undefined;
}

export const CustomCheckBox = ({
    name,
    label,
}: Props) => {
    const {
        field,
        fieldState: { error, },
    } = useController({ name, defaultValue: false });

    const hasError = Boolean(!!error);

    return (
        <View>
            <Checkbox.Item
                label={label}
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)
                }
            />

            <HelperText type="error" visible={hasError}>
                {error?.message?.toString()}
            </HelperText>
        </View>
    )
}
