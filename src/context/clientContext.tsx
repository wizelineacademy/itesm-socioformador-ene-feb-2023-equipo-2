import { createContext, useState } from 'react';
import React from 'react';

/*interface clientValueType { 
  value: string | null;
  setValue: (newValue: string) => void;
}*/

/*type clientInterface = {
  value: string,
}*/

type currentClientOptionsTypes = {
  currentClient: string | null, 
  setCurrentClient: React.Dispatch<React.SetStateAction<string | null>>
}

type currentClientContextProviderProps = {
  children: React.ReactNode
}

export const clientContext = createContext<currentClientOptionsTypes | null>(null);

//export const ClientListContext = createContext<clientOptionsTypes | null>(null);
export const ClientContext = ({children}: currentClientContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [currentClient, setCurrentClient] = useState<string | null>(null);
  return (
    <clientContext.Provider value={{currentClient, setCurrentClient}}>
      {children}
    </clientContext.Provider>
  )
}

// you need to import departmentContextProvider in other files to use this
/*export const ClientContext = React.createContext<clientValueType>({
  value: null,
  setValue: () => {},
});*/

type clientSelectionInterface = {
  value: string,
  label: string,
  email: string,
  phone: string,
  erased: string
}

type clientOptionsTypes = {
  selectedClient: clientSelectionInterface[] | null, 
  setSelectedClientList: React.Dispatch<React.SetStateAction<clientSelectionInterface[] | null>>
}

type selectedClientContextProviderProps = {
  children: React.ReactNode
}

export const clientListContext = createContext<clientOptionsTypes | null>(null);

//export const ClientListContext = createContext<clientOptionsTypes | null>(null);
export const ClientListContext = ({children}: selectedClientContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedClient, setSelectedClientList] = useState<clientSelectionInterface[] | null>(null);
  return (
    <clientListContext.Provider value={{selectedClient, setSelectedClientList}}>
      {children}
    </clientListContext.Provider>
  )
}