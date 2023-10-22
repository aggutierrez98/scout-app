import { Dimensions } from "react-native";
import React, { Component, RefObject } from "react";
import {
  Chip,
  Divider,
  List,
  SegmentedButtons,
  Text,
  useTheme,
} from "react-native-paper";
import { useMenuContext } from "../context/MenuContext";
import Popover from "react-native-popover-view";

export default function FiltersMenu({
  parentRef,
}: {
  parentRef: RefObject<Component>;
}) {
  const theme = useTheme();
  const {
    showMenu,
    sexo: { handleSexoChange, sexo, sexoList },
    progresion: {
      progresionesSelected,
      progresionList,
      handleProgresionChange,
    },
    funcion: { funcionesList, funcionesSelected, handleFuncionChange },
    patrulla: { patrullasSelected, patrullaList, handlePatrullaChange },
    toogleMenu,
  } = useMenuContext();

  return (
    <React.Fragment>
      <Popover
        verticalOffset={-10}
        from={parentRef}
        isVisible={showMenu}
        onRequestClose={() => toogleMenu(false)}
        popoverStyle={{
          backgroundColor: theme.colors.background,
          padding: 20,
          width: Dimensions.get("window").width * 0.9,
        }}
        backgroundStyle={{ opacity: 0.7 }}
        animationConfig={{ useNativeDriver: true, duration: 200 }}
      >
        <Text>Seleccione filtros de busqueda</Text>

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

          <List.Subheader>Sexo</List.Subheader>

          <SegmentedButtons
            value={sexo}
            onValueChange={handleSexoChange}
            buttons={sexoList}
          />
        </List.AccordionGroup>
      </Popover>
    </React.Fragment>
  );
}
