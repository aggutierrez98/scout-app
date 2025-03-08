import { useEquipos } from "hooks";
import { createContext, useContext, useState, ReactNode } from "react";
import { progresionList, sexoList, funcionesList, religionList, ramasList, tipoEntregaList, metodosPagoList, trueFalseList } from '../utils/constants';

export interface MenuContextProps {
    showMenu: boolean;
    toogleMenu: () => void;
    scoutId: string,
    handleScoutIdChange: (arg: string) => void;
    scoutSelected: string,
    handleScoutSelectedChange: (arg: string) => void;
    sexo: {
        sexo: string;
        handleSexoChange: (arg: string) => void;
        sexoList: {
            value: string;
            label: string;
        }[];
    };
    progresion: {
        progresionesSelected: string[];
        handleProgresionChange: (arg: string) => void;
        progresionList: {
            value: string;
            label: string;
        }[];
    };
    equipo: {
        equiposSelected: string[];
        handleEquipoChange: (arg: string) => void;
        equipoList: {
            value: string;
            label: string;
        }[];
    };
    funcion: {
        funcionesSelected: string[];
        handleFuncionChange: (arg: string) => void;
        funcionesList: {
            value: string;
            label: string;
        }[];
    };
    religionList: {
        value: string;
        label: string;
    }[];
    rama: {
        ramasSelected: string[];
        handleRamaChange: (arg: string) => void;
        ramasList: {
            value: string;
            label: string;
        }[];
    },
    tiempo: {
        tiempoDesde: Date;
        tiempoHasta: Date;
        setTiempoDesde: (arg: Date) => void;
        setTiempoHasta: (arg: Date) => void;
    };
    trueFalseList: {
        value: string;
        label: string;
    }[];
    metodoPago: {
        metodoPago: string;
        handleMetodoPagoChange: (arg: string) => void;
        metodosPagoList: {
            value: string;
            label: string;
        }[];
    };
    rendido: {
        rendido: string;
        handleRendidoChange: (arg: string) => void;
    };
    tipoEntrega: {
        tipoEntregasSelected: string[];
        handleTipoEntregaChange: (arg: string) => void;
        tipoEntregaList: {
            value: string;
            label: string;
        }[];
    };
    vence: {
        vence: string;
        handleVenceChange: (arg: string) => void;
    };
}

const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider = ({
    children,
}: {
    children: ReactNode[] | ReactNode;
}) => {
    // const { addListener, removeListener } = useNavigation();
    // useFocusEffect(() => {
    //     addListener("beforeRemove", () => {
    //         toogleMenu()
    //     })
    //     return () => removeListener("beforeRemove", () => { })
    // })

    const { data: equiposData } = useEquipos();
    const [scoutId, setScoutId] = useState("")
    const [scoutSelected, setScoutSelected] = useState("")
    const [showMenu, setShowMenu] = useState(false);
    const [sexo, setSexo] = useState<string>("");
    const [rendido, setRendido] = useState("");
    const [metodoPago, setMetodoPago] = useState<string>("");
    const dateActual: Date = new Date(Date.now());
    const date1AñoAntes: Date = new Date(Date.now());
    date1AñoAntes.setFullYear(date1AñoAntes.getFullYear() - 1);
    const [tiempoDesde, setTiempoDesde] = useState(date1AñoAntes);
    const [tiempoHasta, setTiempoHasta] = useState(dateActual);
    const [vence, setVence] = useState("");
    const [tipoEntregasSelected, setTipoEntregasSelected] = useState<string[]>([]);
    const [equiposSelected, setEquiposSelected] = useState<string[]>([]);
    const equipoList =
        equiposData?.map((equipo) => ({
            label: equipo.nombre,
            value: equipo.id,
        })) || [];


    const [progresionesSelected, setProgresionesSelected] = useState<string[]>(
        [],
    );
    const [funcionesSelected, setFuncionesSelected] = useState<string[]>([]);
    const [ramasSelected, setRamasSelected] = useState<string[]>([]);

    const handleScoutIdChange = (arg: string) => {
        setScoutId(arg);
    };
    const handleScoutSelectedChange = (arg: string) => {
        setScoutSelected(arg);
    };

    const handleEquipoChange = (arg: string) => {
        if (equiposSelected.includes(arg)) {
            setEquiposSelected(
                equiposSelected.filter((item) => item !== arg),
            );
        } else {
            setEquiposSelected([...equiposSelected, arg]);
        }
    };

    const handleProgresionChange = (arg: string) => {
        if (progresionesSelected.includes(arg)) {
            setProgresionesSelected(
                progresionesSelected.filter((item) => item !== arg),
            );
        } else {
            setProgresionesSelected([...progresionesSelected, arg]);
        }
    };

    const handleFuncionChange = (arg: string) => {
        if (funcionesSelected.includes(arg)) {
            setFuncionesSelected(
                funcionesSelected.filter((item) => item !== arg),
            );
        } else {
            setFuncionesSelected([...funcionesSelected, arg]);
        }
    };

    const handleRamaChange = (arg: string) => {
        if (ramasSelected.includes(arg)) {
            setRamasSelected(
                ramasSelected.filter((item) => item !== arg),
            );
        } else {
            setRamasSelected([...ramasSelected, arg]);
        }
    };
    const handleSexoChange = (arg: string) => {
        setSexo(arg);
    };

    const handleRendidoChange = (arg: string) => {
        setRendido(arg);
    };

    const handleMetodoPagoChange = (arg: string) => {
        setMetodoPago(arg);
    };

    const handleTipoEntregaChange = (arg: string) => {
        if (tipoEntregasSelected.includes(arg)) {
            setTipoEntregasSelected(
                tipoEntregasSelected.filter((item) => item !== arg)
            );
        } else {
            setTipoEntregasSelected([...tipoEntregasSelected, arg]);
        }
    };

    const handleVenceChange = (arg: string) => {
        setVence(arg);
    };

    const toogleMenu = () => {
        setShowMenu((show) => !show);
    };

    return (
        <MenuContext.Provider
            value={{
                showMenu,
                toogleMenu,
                scoutId,
                handleScoutIdChange,
                scoutSelected,
                handleScoutSelectedChange,
                sexo: {
                    sexo,
                    sexoList,
                    handleSexoChange,
                },
                progresion: {
                    progresionesSelected,
                    progresionList,
                    handleProgresionChange,
                },
                equipo: {
                    equiposSelected,
                    equipoList,
                    handleEquipoChange,
                },
                funcion: {
                    funcionesSelected,
                    funcionesList,
                    handleFuncionChange,
                },
                rama: {
                    ramasSelected,
                    handleRamaChange,
                    ramasList
                },
                religionList,
                tiempo: {
                    tiempoDesde,
                    tiempoHasta,
                    setTiempoDesde,
                    setTiempoHasta,
                },
                metodoPago: {
                    metodoPago,
                    metodosPagoList,
                    handleMetodoPagoChange,
                },
                rendido: {
                    rendido,
                    handleRendidoChange,
                },
                tipoEntrega: {
                    tipoEntregasSelected,
                    tipoEntregaList,
                    handleTipoEntregaChange,
                },
                vence: {
                    vence,
                    handleVenceChange,
                },
                trueFalseList,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => useContext(MenuContext);
