import { ReactNode, createContext, useContext, useState } from "react";

interface ContextProps {
  modalVisible: boolean;
  showDialog: () => void;
  hideDialog: () => void;
  setIdToDelete: (arg: string) => void;
  idToDelete: string;
}

export const PagoContext = createContext({} as ContextProps);

export const PagoProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const [modalVisible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [idToDelete, setIdToDelete] = useState("");

  return (
    <PagoContext.Provider
      value={{
        modalVisible,
        showDialog,
        hideDialog,
        setIdToDelete,
        idToDelete,
      }}
    >
      {children}
    </PagoContext.Provider>
  );
};

export const usePagoContext = () => useContext(PagoContext);
