import { CustomCheckBox } from 'components/layout/CustomCheckBox';
import CustomSearchableDropdown from 'components/layout/CustomSearchableDropdown';
import { CustomRangeDatePicker } from 'components/layout/RangeDatePicker';
import { CustomDropDown } from 'components/layout/SelectInput';
import { CustomTextInput } from 'components/layout/TextInput';
import { useAllScouts, useFamiliaresScout } from 'hooks';
import { List } from 'react-native-paper';
import { tipoEventoList } from 'utils/constants';
import { useController, useWatch } from "react-hook-form";

interface Props {
    document: {
        name: string,
        id: string
    }
}

export const DocumentFillingFields = ({ document: { name, id } }: Props) => {

    const dateActual: Date = new Date(Date.now());
    const date1DiaDespues: Date = new Date(Date.now());
    date1DiaDespues.setDate(date1DiaDespues.getDate() + 1);
    const { data: scouts } = useAllScouts();
    const scoutId = useWatch({ name: "scoutId" })
    const retiraSolo = useWatch({ name: "retiraSolo" })
    const { data: familiares } = useFamiliaresScout(scoutId ?? "")
    const scoutsList =
        scouts?.map(({ id, nombre, apellido }) => ({
            label: `${apellido} ${nombre}`,
            value: id,
        })) || [];

    const familiaresList = familiares?.map(({ id, nombre, apellido }) => ({
        label: `${apellido} ${nombre}`,
        value: id,
    })) || [];

    const { field: { value: fechaComienzoValue, onChange: fechaComienzoChange } } = useController({ name: "fechaEventoComienzo", defaultValue: dateActual })
    const { field: { value: fechaFinValue, onChange: fechaFinChange } } = useController({ name: "fechaEventoFin", defaultValue: date1DiaDespues })

    return (
        <>
            <CustomSearchableDropdown
                name="scoutId"
                label="Scout asociado"
                list={scoutsList}
                dropDownContainerStyle={{ marginVertical: 0 }}
            />
            {
                name === "Autorizacion ingreso de menores de edad" &&
                <>
                    <CustomTextInput
                        name="aclaraciones"
                        label="Aclaraciones"
                        placeholder={"Ingrese aclaraciones pertinentes"}
                    />
                </>
            }
            {
                name === "Autorizacion para retiro de jovenes" &&
                <>
                    <CustomCheckBox
                        label="Se retira solo?"
                        name="retiraSolo"
                    />

                    {!retiraSolo &&
                        <CustomDropDown
                            name="retiraPersonas"
                            label="Personas autorizadas a retirarlo"
                            list={familiaresList}
                            multi={true}
                        />
                    }

                </>
            }
            {
                name === "Autorizacion de uso de imagen" &&
                <>
                </>
            }
            {
                name === "Caratula legajo" &&
                <>
                </>
            }
            {
                name === "Autorizacion de salidas cercanas" &&
                <>
                </>
            }
            {
                name === "Autorizacion para salidas acantonamientos campamentos" &&
                <>
                    <CustomDropDown
                        name="tipoEvento"
                        label="Seleccione salida/acantonamiento/campamento"
                        list={tipoEventoList}
                        dropDownContainerStyle={{ marginVertical: -5 }}
                    />

                    <CustomTextInput
                        name="lugarEvento"
                        label="Lugar del evento"
                        placeholder={"Ingrese lugar del evento"}
                    />

                    <List.Section style={{ marginBottom: 10 }}>
                        <List.Subheader style={{ marginTop: 10 }}>
                            Seleccionar fechas del evento
                        </List.Subheader>
                        <CustomRangeDatePicker
                            startValue={new Date(fechaComienzoValue)}
                            endValue={new Date(fechaFinValue)}
                            setStartValue={fechaComienzoChange}
                            setEndValue={fechaFinChange}
                        />
                    </List.Section>
                </>
            }
        </>
    )
}
