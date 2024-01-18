import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useDocumentsData } from "client/documento";
import { usePatrullas } from "client/patrulla";
import { createContext, useContext, useState, ReactNode } from "react";
import {
  VALID_FUNCTIONS,
  VALID_METODOS_PAGO,
  VALID_PROGRESSIONS,
} from "validators/constants";

type MenuMode = "scouts" | "pagos" | "documentos";

export interface MenuContextProps {
  showMenu: boolean;
  menuMode: MenuMode;
  toogleMenu: (arg: boolean, arg2: MenuMode) => void;
  sexo: {
    sexo: string;
    handleSexoChange: (arg: string) => void;
    sexoList: {
      value: string;
      label: string;
    }[];
  };
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
  patrulla: {
    patrullasSelected: string[];
    handlePatrullaChange: (arg: string) => void;
    patrullaList: {
      value: string;
      label: string;
    }[];
  };
  documento: {
    documentosSelected: string[];
    handleDocumentoChange: (arg: string) => void;
    documentosList: {
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

const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const { data: patrullasData } = usePatrullas();
  const { data: documentosData } = useDocumentsData();

  const [showMenu, setShowMenu] = useState(false);
  const [menuMode, setMenuMode] = useState<MenuMode>("scouts");
  const [sexo, setSexo] = useState<string>("");
  const [rendido, setRendido] = useState("");
  const [vence, setVence] = useState("");
  const [metodoPago, setMetodoPago] = useState<string>("");
  const dateActual: Date = new Date(Date.now());
  const date3MesesAntes: Date = new Date(Date.now());
  date3MesesAntes.setMonth(date3MesesAntes.getMonth() - 5);
  const [tiempoDesde, setTiempoDesde] = useState(date3MesesAntes);
  const [tiempoHasta, setTiempoHasta] = useState(dateActual);

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

  const metodosPagoList = VALID_METODOS_PAGO.map((metodoPago: string) => ({
    label: metodoPago,
    value: metodoPago,
  }));
  metodosPagoList.unshift({ label: "TODOS", value: "" });

  const trueFalseList = [
    { label: "Ambos", value: "" },
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  const [patrullasSelected, setPatrullasSelected] = useState<string[]>([]);
  const patrullaList =
    patrullasData?.map((patrulla) => ({
      label: patrulla.nombre,
      value: patrulla.id,
    })) || [];

  const [documentosSelected, setDocumentosSelected] = useState<string[]>([]);
  const documentosList =
    documentosData?.map((documento) => ({
      label: documento.nombre,
      value: documento.id,
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

  const toogleMenu = (show: boolean, mode: MenuMode) => {
    setShowMenu(show ? show : !showMenu);
    setMenuMode(mode);
  };

  const handlePatrullaChange = (arg: string) => {
    if (patrullasSelected.includes(arg)) {
      setPatrullasSelected(patrullasSelected.filter((item) => item !== arg));
    } else {
      setPatrullasSelected([...patrullasSelected, arg]);
    }
  };
  const handleDocumentoChange = (arg: string) => {
    if (documentosSelected.includes(arg)) {
      setDocumentosSelected(documentosSelected.filter((item) => item !== arg));
    } else {
      setDocumentosSelected([...documentosSelected, arg]);
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
  const handleSexoChange = (arg: string) => {
    setSexo(arg);
  };

  const handleRendidoChange = (arg: string) => {
    setRendido(arg);
  };
  const handleVenceChange = (arg: string) => {
    setVence(arg);
  };

  const handleMetodoPagoChange = (arg: string) => {
    setMetodoPago(arg);
  };

  return (
    <MenuContext.Provider
      value={{
        showMenu,
        menuMode,
        toogleMenu,
        sexo: {
          sexo,
          sexoList,
          handleSexoChange,
        },
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
        documento: {
          documentosSelected,
          documentosList,
          handleDocumentoChange,
        },
        funcion: {
          funcionesSelected,
          funcionesList,
          handleFuncionChange,
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
