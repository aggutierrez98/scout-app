import { ReactNode, createContext, useContext, useState } from "react";

interface ContextProps {
    modalVisible: boolean;
    showDialog: () => void;
    hideDialog: () => void;
    setIdToDelete: (arg: string) => void;
    idToDelete: string;
}

export const DialogContext = createContext({} as ContextProps);

export const DialogProvider = ({
    children,
}: {
    children: ReactNode[] | ReactNode;
}) => {
    const [modalVisible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [idToDelete, setIdToDelete] = useState("");

    return (
        <DialogContext.Provider
            value={{
                modalVisible,
                showDialog,
                hideDialog,
                setIdToDelete,
                idToDelete,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = () => useContext(DialogContext);
