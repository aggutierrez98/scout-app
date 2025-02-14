import { useEquipos } from "hooks";
import { createContext, useContext, useState, ReactNode } from "react";
import {
	VALID_FUNCTIONS,
	VALID_PROGRESSIONS,
	VALID_RELIGIONS,
} from "utils/constants";

export interface ScoutMenuContextProps {
	showMenu: boolean;
	toogleMenuScouts: () => void;
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
}

const ScoutMenuContext = createContext({} as ScoutMenuContextProps);

export const ScoutMenuProvider = ({
	children,
}: {
	children: ReactNode[] | ReactNode;
}) => {
	const { data: equiposData } = useEquipos();

	const [showMenu, setShowMenu] = useState(false);
	const [sexo, setSexo] = useState<string>("");

	const sexoList = [
		{
			label: "Ambos",
			value: "",
		},
		{
			label: "Masculino",
			value: "M",
		},
		{
			label: "Femenino",
			value: "F",
		},
	];

	const toogleMenuScouts = () => {
		setShowMenu((show) => !show);
	};

	const [equiposSelected, setEquiposSelected] = useState<string[]>([]);
	const equipoList =
		equiposData?.map((equipo) => ({
			label: equipo.nombre,
			value: equipo.id,
		})) || [];

	const [progresionesSelected, setProgresionesSelected] = useState<string[]>(
		[],
	);
	const progresionList = VALID_PROGRESSIONS.map((progresion) => ({
		label: progresion,
		value: progresion,
	}));

	const [funcionesSelected, setFuncionesSelected] = useState<string[]>([]);
	const funcionesList = VALID_FUNCTIONS.map((funcion) => ({
		label: funcion,
		value: funcion,
	}));

	const religionList = VALID_RELIGIONS.map((religion) => {
		return {
			label: religion,
			value: religion,
		};
	});

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
	const handleSexoChange = (arg: string) => {
		setSexo(arg);
	};

	return (
		<ScoutMenuContext.Provider
			value={{
				showMenu,
				toogleMenuScouts,
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
				religionList,
			}}
		>
			{children}
		</ScoutMenuContext.Provider>
	);
};

export const useScoutMenuContext = () => useContext(ScoutMenuContext);
