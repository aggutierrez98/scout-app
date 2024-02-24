import { usePatrullas } from "hooks";
import { createContext, useContext, useState, ReactNode } from "react";
import {
  VALID_ENTREGAS_TYPE,
  VALID_FUNCTIONS,
  VALID_PROGRESSIONS,
} from "utils/constants";

export interface EntregaContextProps {
  showMenu: boolean;
  toogleMenuEntregas: () => void;
  tipoEntrega: {
    tipoEntregasSelected: string[];
    handleTipoEntregaChange: (arg: string) => void;
    tipoEntregaList: {
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
  patrulla: {
    patrullasSelected: string[];
    handlePatrullaChange: (arg: string) => void;
    patrullaList: {
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
  tiempo: {
    tiempoDesde: Date;
    tiempoHasta: Date;
    setTiempoDesde: (arg: Date) => void;
    setTiempoHasta: (arg: Date) => void;
  };
}

const EntregaContext = createContext({} as EntregaContextProps);

export const EntregaMenuProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const { data: patrullasData } = usePatrullas();
  const [showMenu, setShowMenu] = useState(false);
  const dateActual: Date = new Date(Date.now());
  const date3MesesAntes: Date = new Date(Date.now());
  date3MesesAntes.setMonth(date3MesesAntes.getMonth() - 5);
  const [tiempoDesde, setTiempoDesde] = useState(date3MesesAntes);
  const [tiempoHasta, setTiempoHasta] = useState(dateActual);
  const [tipoEntregasSelected, setTipoEntregasSelected] = useState<string[]>(
    []
  );
  const tipoEntregaList = VALID_ENTREGAS_TYPE.map((tipoEntrega: string) => ({
    label: tipoEntrega,
    value: tipoEntrega,
  }));
  tipoEntregaList.unshift({ label: "TODOS", value: "" });

  const [patrullasSelected, setPatrullasSelected] = useState<string[]>([]);
  const patrullaList =
    patrullasData?.map((patrulla) => ({
      label: patrulla.nombre,
      value: patrulla.id,
    })) || [];

  const [progresionesSelected, setProgresionesSelected] = useState<string[]>(
    []
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

  const toogleMenuEntregas = () => {
    setShowMenu((show) => !show);
  };

  const handlePatrullaChange = (arg: string) => {
    if (patrullasSelected.includes(arg)) {
      setPatrullasSelected(patrullasSelected.filter((item) => item !== arg));
    } else {
      setPatrullasSelected([...patrullasSelected, arg]);
    }
  };

  const handleProgresionChange = (arg: string) => {
    if (progresionesSelected.includes(arg)) {
      setProgresionesSelected(
        progresionesSelected.filter((item) => item !== arg)
      );
    } else {
      setProgresionesSelected([...progresionesSelected, arg]);
    }
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

  const handleFuncionChange = (arg: string) => {
    if (funcionesSelected.includes(arg)) {
      setFuncionesSelected(funcionesSelected.filter((item) => item !== arg));
    } else {
      setFuncionesSelected([...funcionesSelected, arg]);
    }
  };

  return (
    <EntregaContext.Provider
      value={{
        showMenu,
        toogleMenuEntregas,

        tiempo: {
          tiempoDesde,
          tiempoHasta,
          setTiempoDesde,
          setTiempoHasta,
        },
        progresion: {
          progresionesSelected,
          progresionList,
          handleProgresionChange,
        },
        patrulla: {
          patrullasSelected,
          patrullaList,
          handlePatrullaChange,
        },

        funcion: {
          funcionesSelected,
          funcionesList,
          handleFuncionChange,
        },

        tipoEntrega: {
          tipoEntregasSelected,
          tipoEntregaList,
          handleTipoEntregaChange,
        },
      }}
    >
      {children}
    </EntregaContext.Provider>
  );
};

export const useEntregaMenuContext = () => useContext(EntregaContext);
