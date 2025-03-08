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
import { AccordionFilter } from "components/layout/AccordionFilter";
import { useMenuContext } from "context/MenuContext";
import { CustomRangeDatePicker } from "components/layout/RangeDatePicker";

interface FiltersMenuProps {
    parentRef: RefObject<Component>;
    section: "scouts" | "documentos" | "pagos" | "entregas"
}

export default function FiltersMenu({
    parentRef,
    section,
}: FiltersMenuProps) {
    const theme = useTheme();
    const {
        showMenu,
        scoutSelected,
        handleScoutSelectedChange,
        handleScoutIdChange,
        progresion: {
            progresionesSelected,
            progresionList,
            handleProgresionChange,
        },
        funcion: { funcionesList, funcionesSelected, handleFuncionChange },
        equipo: { equiposSelected, equipoList, handleEquipoChange },
        rama: { ramasSelected, ramasList, handleRamaChange },
        tiempo: { setTiempoDesde, setTiempoHasta, tiempoDesde, tiempoHasta },
        metodoPago: { metodoPago, metodosPagoList, handleMetodoPagoChange },
        tipoEntrega: {
            tipoEntregaList,
            handleTipoEntregaChange,
            tipoEntregasSelected,
        },
        sexo: { handleSexoChange, sexo, sexoList },
        vence: { vence, handleVenceChange },
        rendido: { rendido, handleRendidoChange },
        trueFalseList,
        toogleMenu,
    } = useMenuContext();

    return (
        <React.Fragment>
            <Popover
                verticalOffset={-40}
                from={parentRef}
                isVisible={showMenu}
                onRequestClose={() => toogleMenu()}
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
                    <Text>Seleccione filtros de busqueda</Text>
                    {scoutSelected &&
                        <>
                            <Divider style={{ marginVertical: 10 }} />
                            <Chip
                                closeIcon="close"
                                onClose={() => {
                                    handleScoutSelectedChange("")
                                    handleScoutIdChange("")
                                }}
                            >
                                Seleccionado scout: {scoutSelected}
                            </Chip>
                        </>
                    }
                    <Divider style={{ marginVertical: 10 }} />
                    <List.AccordionGroup>
                        {!scoutSelected && (
                            <>
                                <AccordionFilter
                                    id="rama"
                                    text="Seleccion rama"
                                    handleChange={handleRamaChange}
                                    list={ramasList}
                                    selected={ramasSelected}
                                />
                                <AccordionFilter
                                    id="equipo"
                                    text="Seleccion equipo"
                                    handleChange={handleEquipoChange}
                                    list={equipoList}
                                    selected={equiposSelected}
                                />
                                <AccordionFilter
                                    id="progresion"
                                    text="Seleccione progresion"
                                    handleChange={handleProgresionChange}
                                    list={progresionList}
                                    selected={progresionesSelected}
                                />
                                <AccordionFilter
                                    id="funcion"
                                    text="Seleccione funcion"
                                    handleChange={handleFuncionChange}
                                    list={funcionesList}
                                    selected={funcionesSelected}
                                />
                            </>
                        )}

                        {section === "pagos" &&
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
                            </>
                        }
                        {section === "documentos" &&
                            <List.Section>
                                <List.Subheader>Vence</List.Subheader>
                                <SegmentedButtons
                                    value={vence}
                                    onValueChange={handleVenceChange}
                                    buttons={trueFalseList}
                                />
                            </List.Section>
                        }

                        {section === "scouts" &&
                            <List.Section>
                                <List.Subheader>Sexo</List.Subheader>
                                <SegmentedButtons
                                    value={sexo}
                                    onValueChange={handleSexoChange}
                                    buttons={sexoList}
                                />
                            </List.Section>
                        }

                        {section === "entregas" &&
                            <List.Accordion title="Seleccione tipo entrega" id="entregas">
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
                        }

                        {(section === "documentos" || section === "pagos" || section === "entregas") &&
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
                        }
                    </List.AccordionGroup>
                </ScrollView>
            </Popover>
        </React.Fragment>
    );
}
