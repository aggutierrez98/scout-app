import { ReactNode, createContext, useContext, useState } from "react";

interface ContextProps {
    modalVisible: boolean;
    modalConfirmationVisible: boolean;
    showDialog: () => void;
    hideDialog: () => void;
    showDialogConfirmation: () => void;
    hideDialogConfirmation: () => void;
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
    const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const showDialogConfirmation = () => setModalConfirmationVisible(true);
    const hideDialogConfirmation = () => setModalConfirmationVisible(false);
    const [idToDelete, setIdToDelete] = useState("");

    return (
        <DialogContext.Provider
            value={{
                modalVisible,
                modalConfirmationVisible,
                showDialog,
                hideDialog,
                setIdToDelete,
                showDialogConfirmation,
                hideDialogConfirmation,
                idToDelete,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = () => useContext(DialogContext);
