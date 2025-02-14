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
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { useScoutMenuContext } from "context/ScoutsMenuContext";
import { AccordionFilter } from "components/layout/AccordionFilter";

export default function ScoutsFiltersMenu({
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
    equipo: { equiposSelected, equipoList, handleEquipoChange },
    toogleMenuScouts,
  } = useScoutMenuContext();

  return (
    <React.Fragment>
      <Popover
        verticalOffset={-40}
        from={parentRef}
        isVisible={showMenu}
        onRequestClose={() => toogleMenuScouts()}
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
          <Text>Seleccione filtros de busqueda de scouts</Text>

          <Divider style={{ marginVertical: 10 }} />

          <List.AccordionGroup>
            <AccordionFilter
              id="1"
              text="Seleccion equipo"
              handleChange={handleEquipoChange}
              list={equipoList}
              selected={equiposSelected}
            />

            <AccordionFilter
              id="2"
              text="Seleccione progresion"
              handleChange={handleProgresionChange}
              list={progresionList}
              selected={progresionesSelected}
            />

            <AccordionFilter
              id="3"
              text="Seleccione funcion"
              handleChange={handleFuncionChange}
              list={funcionesList}
              selected={funcionesSelected}
            />

            <List.Section>
              <List.Subheader>Sexo</List.Subheader>
              <SegmentedButtons
                value={sexo}
                onValueChange={handleSexoChange}
                buttons={sexoList}
              />
            </List.Section>
          </List.AccordionGroup>
        </ScrollView>
      </Popover>
    </React.Fragment>
  );
}
