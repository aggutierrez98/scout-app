import { useEquipos } from "hooks";
import { createContext, useContext, useState, ReactNode } from "react";
import {
  VALID_ENTREGAS_TYPE,
  VALID_FUNCTIONS,
  VALID_METODOS_PAGO,
  VALID_PROGRESSIONS,
} from "utils/constants";

export interface DocumentosMenuContextProps {
  showMenu: boolean;
  toogleMenuDocumentos: () => void;
  vence: {
    vence: string;
    handleVenceChange: (arg: string) => void;
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
}

const DocumentosMenuContext = createContext({} as DocumentosMenuContextProps);

export const DocumentosMenuProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const { data: equiposData } = useEquipos();

  const [showMenu, setShowMenu] = useState(false);
  const [vence, setVence] = useState("");
  const dateActual: Date = new Date(Date.now());
  const date3MesesAntes: Date = new Date(Date.now());
  date3MesesAntes.setMonth(date3MesesAntes.getMonth() - 5);
  const [tiempoDesde, setTiempoDesde] = useState(date3MesesAntes);
  const [tiempoHasta, setTiempoHasta] = useState(dateActual);

  const metodosPagoList = VALID_METODOS_PAGO.map((metodoPago: string) => ({
    label: metodoPago,
    value: metodoPago,
  }));
  metodosPagoList.unshift({ label: "TODOS", value: "" });

  const tipoEntregaList = VALID_ENTREGAS_TYPE.map((tipoEntrega: string) => ({
    label: tipoEntrega,
    value: tipoEntrega,
  }));
  tipoEntregaList.unshift({ label: "TODOS", value: "" });

  const trueFalseList = [
    { label: "Ambos", value: "" },
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  const [equiposSelected, setEquiposSelected] = useState<string[]>([]);
  const equipoList =
    equiposData?.map((equipo) => ({
      label: equipo.nombre,
      value: equipo.id,
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

  const toogleMenuDocumentos = () => {
    setShowMenu((show) => !show);
  };

  const handleEquipoChange = (arg: string) => {
    if (equiposSelected.includes(arg)) {
      setEquiposSelected(equiposSelected.filter((item) => item !== arg));
    } else {
      setEquiposSelected([...equiposSelected, arg]);
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

  const handleFuncionChange = (arg: string) => {
    if (funcionesSelected.includes(arg)) {
      setFuncionesSelected(funcionesSelected.filter((item) => item !== arg));
    } else {
      setFuncionesSelected([...funcionesSelected, arg]);
    }
  };
  const handleVenceChange = (arg: string) => {
    setVence(arg);
  };

  return (
    <DocumentosMenuContext.Provider
      value={{
        showMenu,
        toogleMenuDocumentos,
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
        vence: {
          vence,
          handleVenceChange,
        },
        trueFalseList,
      }}
    >
      {children}
    </DocumentosMenuContext.Provider>
  );
};

export const useDocumentosMenuContext = () => useContext(DocumentosMenuContext);
