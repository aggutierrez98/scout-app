import { ReactNode, createContext, useContext, useState } from "react";

interface ContextProps {
  modalVisible: boolean;
  showDialog: () => void;
  hideDialog: () => void;
  setIdToDelete: (arg: string) => void;
  idToDelete: string;
}

export const DocumentoContext = createContext({} as ContextProps);

export const DocumentoProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const [modalVisible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [idToDelete, setIdToDelete] = useState("");

  return (
    <DocumentoContext.Provider
      value={{
        modalVisible,
        showDialog,
        hideDialog,
        setIdToDelete,
        idToDelete,
      }}
    >
      {children}
    </DocumentoContext.Provider>
  );
};

export const useDocumentoContext = () => useContext(DocumentoContext);
