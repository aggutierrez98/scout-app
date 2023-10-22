import { createContext, useContext, useState, ReactNode } from "react";

export interface EditContextProps {
  isEditing: boolean;
  changeIsEditing: () => void;
}

const EditContext = createContext({} as EditContextProps);

export const EditProvider = ({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const changeIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <EditContext.Provider
      value={{
        isEditing,
        changeIsEditing,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
