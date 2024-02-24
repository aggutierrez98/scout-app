import { Dimensions, Easing, ScrollView } from "react-native";
import React, { Component, RefObject } from "react";
import {
  Chip,
  Divider,
  List,
  SegmentedButtons,
  Text,
  useTheme,
} from "react-native-paper";
import Popover from "react-native-popover-view";
import { useDocumentosMenuContext } from "context/DocumentosMenuContext";
import { CustomRangeDatePicker } from "components/layout/RangeDatePicker";

export default function DocumentosFiltersMenu({
  parentRef,
}: {
  parentRef: RefObject<Component>;
}) {
  const theme = useTheme();
  const {
    showMenu,
    progresion: {
      progresionesSelected,
      progresionList,
      handleProgresionChange,
    },
    funcion: { funcionesList, funcionesSelected, handleFuncionChange },
    patrulla: { patrullasSelected, patrullaList, handlePatrullaChange },
    tiempo: { setTiempoDesde, setTiempoHasta, tiempoDesde, tiempoHasta },
    vence: { vence, handleVenceChange },
    trueFalseList,
    toogleMenuDocumentos,
  } = useDocumentosMenuContext();

  return (
    <React.Fragment>
      <Popover
        isVisible={showMenu}
        from={parentRef}
        onRequestClose={() => toogleMenuDocumentos()}
        verticalOffset={-40}
        popoverStyle={{
          backgroundColor: theme.colors.background,
          padding: 20,
          width: Dimensions.get("window").width * 0.9,
        }}
        backgroundStyle={{ opacity: 0.7 }}
        animationConfig={{
          useNativeDriver: true,
          duration: 150,
          easing: Easing.inOut(Easing.quad),
        }}
      >
        <ScrollView>
          <Text>Seleccione filtros de busqueda de documentos</Text>

          <Divider style={{ marginVertical: 10 }} />

          <List.AccordionGroup>
            <List.Accordion title="Seleccione patrulla" id="1">
              {patrullaList.map(({ label, value }, index) => (
                <Chip
                  key={value + index}
                  onPress={() => handlePatrullaChange(value)}
                  style={{ marginVertical: 10, marginHorizontal: 15 }}
                  selected={patrullasSelected.includes(value)}
                  showSelectedCheck
                  showSelectedOverlay={true}
                  compact
                >
                  {label}
                </Chip>
              ))}
            </List.Accordion>

            <List.Accordion title="Seleccione progresion" id="2">
              {progresionList.map(({ label, value }, index) => (
                <Chip
                  key={value + index}
                  onPress={() => handleProgresionChange(value)}
                  style={{ marginVertical: 10, marginHorizontal: 15 }}
                  selected={progresionesSelected.includes(value)}
                  showSelectedCheck
                  showSelectedOverlay={true}
                  compact
                >
                  {label}
                </Chip>
              ))}
            </List.Accordion>

            <List.Accordion title="Seleccione funcion" id="3">
              {funcionesList.map(({ label, value }, index) => (
                <Chip
                  key={value + index}
                  onPress={() => handleFuncionChange(value)}
                  style={{ marginVertical: 10, marginHorizontal: 15 }}
                  selected={funcionesSelected.includes(value)}
                  showSelectedCheck
                  showSelectedOverlay={true}
                  compact
                >
                  {label}
                </Chip>
              ))}
            </List.Accordion>

            <List.Section>
              <List.Subheader>Vence</List.Subheader>
              <SegmentedButtons
                value={vence}
                onValueChange={handleVenceChange}
                buttons={trueFalseList}
              />
            </List.Section>

            <List.Section>
              <List.Subheader style={{ marginTop: 10 }}>
                Seleccionar fechas
              </List.Subheader>
              <CustomRangeDatePicker
                startValue={new Date(tiempoDesde)}
                endValue={new Date(tiempoHasta)}
                setStartValue={setTiempoDesde}
                setEndValue={setTiempoHasta}
              />
            </List.Section>
          </List.AccordionGroup>
        </ScrollView>
      </Popover>
    </React.Fragment>
  );
}
