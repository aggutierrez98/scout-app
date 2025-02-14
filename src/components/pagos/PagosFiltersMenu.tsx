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
import { usePagoMenuContext } from "context/PagosMenuContext";
import { CustomRangeDatePicker } from "components/layout/RangeDatePicker";
import { AccordionFilter } from "components/layout/AccordionFilter";

export default function PagosFiltersMenu({
  parentRef,
}: {
  parentRef: RefObject<Component>;
}) {
  const theme = useTheme();
  const {
    showMenu,
    metodoPago: { metodoPago, metodosPagoList, handleMetodoPagoChange },
    progresion: {
      progresionesSelected,
      progresionList,
      handleProgresionChange,
    },
    funcion: { funcionesList, funcionesSelected, handleFuncionChange },
    equipo: { equiposSelected, equipoList, handleEquipoChange },
    tiempo: { setTiempoDesde, setTiempoHasta, tiempoDesde, tiempoHasta },
    rendido: { rendido, handleRendidoChange },
    trueFalseList,
    toogleMenuPagos,
  } = usePagoMenuContext();

  return (
    <React.Fragment>
      <Popover
        from={parentRef}
        isVisible={showMenu}
        onRequestClose={() => toogleMenuPagos()}
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
          <Text>Seleccione filtros de busqueda de pagos</Text>

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

            <>
              <List.Section>
                <List.Subheader>Metodos de pago</List.Subheader>
                <SegmentedButtons
                  value={metodoPago}
                  onValueChange={handleMetodoPagoChange}
                  buttons={metodosPagoList}
                />
              </List.Section>

              <List.Section>
                <List.Subheader>Rendido</List.Subheader>
                <SegmentedButtons
                  value={rendido}
                  onValueChange={handleRendidoChange}
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
            </>
          </List.AccordionGroup>
        </ScrollView>
      </Popover>
    </React.Fragment>
  );
}
