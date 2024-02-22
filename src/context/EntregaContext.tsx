import { ReactNode, createContext, useContext, useState } from "react";

interface ContextProps {
  modalVisible: boolean;
  showDialog: () => void;
  hideDialog: () => void;
  setIdToDelete: (arg: string) => void;
  idToDelete: string;
}

export const EntregaContext = createContext({} as ContextProps);

export const EntregaProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const [modalVisible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [idToDelete, setIdToDelete] = useState("");

  return (
    <EntregaContext.Provider
      value={{
        modalVisible,
        showDialog,
        hideDialog,
        setIdToDelete,
        idToDelete,
      }}
    >
      {children}
    </EntregaContext.Provider>
  );
};

export const useEntregaContext = () => useContext(EntregaContext);
