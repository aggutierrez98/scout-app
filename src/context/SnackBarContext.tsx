import { ReactNode, createContext, useContext, useState } from "react";

export interface SnackBarState {
  visibleSnack: boolean;
  snackBarText: string;
  snackBarMode: SnackBarMode;
  toogleSnackBar: (arg: string, arg2: SnackBarMode) => void;
  onDismissSnackBar: () => void;
}

export const SnackBarContext = createContext({} as SnackBarState);

type SnackBarMode = "success" | "error" | "info";

export const SnackBarProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const toogleSnackBar = (text: string, mode: SnackBarMode) => {
    setVisibleSnack(true);
    setSnackBarText(text);
    setSnackBarMode(mode);
  };

  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackBarText, setSnackBarText] = useState("dasdasdasds");
  const [snackBarMode, setSnackBarMode] = useState<SnackBarMode>("info");
  const onDismissSnackBar = () => setVisibleSnack(false);

  return (
    <SnackBarContext.Provider
      value={{
        visibleSnack,
        snackBarMode,
        snackBarText,
        toogleSnackBar,
        onDismissSnackBar,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBarContext = () => useContext(SnackBarContext);
