// import DateTimePicker, {
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

interface Props {
  startValue: CalendarDate;
  setStartValue: (arg: Date) => void;
  endValue: CalendarDate;
  setEndValue: (arg: Date) => void;
}

import { registerTranslation } from "react-native-paper-dates";
registerTranslation("es", {
  save: "Guardar",
  selectSingle: "Seleccionar fecha",
  selectMultiple: "Seleccionar fechas",
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

export const CustomRangeDatePicker = ({
  startValue,
  setStartValue,
  endValue,
  setEndValue,
}: Props) => {
  const defaultDate = new Date(Date.now());
  const [show, setShow] = useState(false);
  const { colors } = useTheme();

  const onConfirm = useCallback(
    ({
      startDate,
      endDate,
    }: {
      startDate: CalendarDate;
      endDate: CalendarDate;
    }) => {
      setStartValue(startDate || defaultDate);
      setEndValue(endDate || defaultDate);
      setShow(false);
    },
    [setShow, setStartValue, setEndValue]
  );

  return (
    <View style={{ marginTop: -10, paddingLeft: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: colors.onPrimary, flex: 1, fontSize: 16 }}>
          {startValue?.toLocaleDateString("es")} -{" "}
          {endValue?.toLocaleDateString("es")}
        </Text>
        <IconButton icon="calendar" size={20} onPress={() => setShow(true)} />
      </View>

      {show && (
        <DatePickerModal
          disableStatusBarPadding
          locale="es"
          mode="range"
          visible={show}
          onDismiss={() => {
            setShow(false);
          }}
          startDate={startValue}
          endDate={endValue}
          onConfirm={onConfirm}
        />
      )}
    </View>
  );
};
