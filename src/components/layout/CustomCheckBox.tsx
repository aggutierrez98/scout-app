import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { View } from "react-native";
import { Checkbox, CheckboxItemProps } from "react-native-paper";

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
        fieldState: { error },
    } = useController({ name, defaultValue: false });

    return (
        <View>
            <Checkbox.Item
                label={label}
                status={field.value ? "checked" : "unchecked"}
                onPress={() => field.onChange(!field.value)
                }
            />
        </View>
    )
}
