import { Dimensions, ScrollView, Easing } from "react-native";
import React, { Component, RefObject } from "react";
import { Chip, Divider, List, Text, useTheme } from "react-native-paper";
import Popover from "react-native-popover-view";
import { useEntregaMenuContext } from "context/EntregasMenuContext";
import { CustomRangeDatePicker } from "components/layout/RangeDatePicker";
import { AccordionFilter } from "components/layout/AccordionFilter";

export default function EntregasFiltersMenu({
  parentRef,
}: {
  parentRef: RefObject<Component>;
}) {
  const theme = useTheme();
  const {
    tipoEntrega: {
      tipoEntregaList,
      handleTipoEntregaChange,
      tipoEntregasSelected,
    },
    progresion: {
      progresionesSelected,
      progresionList,
      handleProgresionChange,
    },
    funcion: { funcionesList, funcionesSelected, handleFuncionChange },
    equipo: { equiposSelected, equipoList, handleEquipoChange },
    tiempo: { setTiempoDesde, setTiempoHasta, tiempoDesde, tiempoHasta },
    showMenu,
    toogleMenuEntregas,
  } = useEntregaMenuContext();

  return (
    <React.Fragment>
      <Popover
        onRequestClose={() => toogleMenuEntregas()}
        verticalOffset={-40}
        from={parentRef}
        isVisible={showMenu}
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
          <Text>Seleccione filtros de busqueda entregas</Text>

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

            <List.Accordion title="Seleccione tipo entrega" id="5">
              {tipoEntregaList.map(({ label, value }, index) => (
                <Chip
                  key={value + index}
                  onPress={() => handleTipoEntregaChange(value)}
                  style={{ marginVertical: 10, marginHorizontal: 15 }}
                  selected={tipoEntregasSelected.includes(value)}
                  showSelectedCheck
                  showSelectedOverlay={true}
                  compact
                >
                  {label}
                </Chip>
              ))}
            </List.Accordion>

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
