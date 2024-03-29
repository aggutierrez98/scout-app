import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { HelperText, IconButton, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

interface Props {
  name: string;
  label: string;
}

import { registerTranslation } from "react-native-paper-dates";
import { useController } from "react-hook-form";
registerTranslation("es", {
  save: "Guardar",
  selectSingle: "Seleccionar fecha",
  selectMultiple: "Seleccionar fecha",
  selectRange: "Seleccionar periodos",
  notAccordingToDateFormat: (inputFormat) =>
    `El tipo de formato debe ser ${inputFormat}`,
  mustBeHigherThan: (date) => `Debe ser mayor que ${date}`,
  mustBeLowerThan: (date) => `Debe ser menor que ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Debe estar entre ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Anterior",
  next: "Siguiente",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Seleccionar fecha del calendario",
  close: "Cerrar",
});

export const CustomDatePicker = ({ name, label }: Props) => {
  const defaultDate = new Date(Date.now());
  const [show, setShow] = useState(false);
  const { colors } = useTheme();

  const {
    field,
    fieldState: { error },
  } = useController({ name });

  const onConfirm = useCallback(
    ({ date }: { date: CalendarDate }) => {
      field.onChange(date || defaultDate);
      setShow(false);
    },
    [setShow, field.onChange]
  );
  const hasError = Boolean(!!error);

  return (
    <View style={{ marginVertical: 5 }}>
      <Text
        style={{
          color: colors.onPrimary,
          fontSize: 12,
          marginBottom: -5,
          marginLeft: 10,
          backgroundColor: colors.background,
          zIndex: 10,
          paddingHorizontal: 5,
          width: label.length * 6.8,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.secondary,
          // backgroundColor: colors.tertiary,
          borderRadius: 5,
          paddingLeft: 15,
        }}
      >
        <Text
          style={{
            color: colors.onPrimary,
            flex: 1,
            fontSize: 16,
          }}
        >
          {field.value?.toLocaleDateString("es")}
        </Text>
        <IconButton icon="calendar" size={20} onPress={() => setShow(true)} />
      </View>

      {show && (
        <DatePickerModal
          disableStatusBarPadding
          locale="es"
          mode="single"
          visible={show}
          onDismiss={() => {
            setShow(false);
          }}
          date={field.value}
          onConfirm={onConfirm}
        />
      )}

      <HelperText type="error" visible={hasError}>
        {error?.message?.toString()}
        {/* {name} ingresado es invalido */}
      </HelperText>
    </View>
  );
};
