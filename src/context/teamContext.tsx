import { createContext, useState } from 'react';
import React from 'react';



/*interface teamValueType { 
  value: string | null;
  setValue: (newValue: string) => void;
}*/

/*type teamInterface = {
  value: string,
}*/

type currentTeamOptionsTypes = {
  currentTeam: string | null, 
  setCurrentTeam: React.Dispatch<React.SetStateAction<string | null>>
}

type currentTeamContextProviderProps = {
  children: React.ReactNode
}

export const teamContext = createContext<currentTeamOptionsTypes | null>(null);

//export const teamListContext = createContext<teamOptionsTypes | null>(null);
export const TeamContext = ({children}: currentTeamContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);
  return (
    <teamContext.Provider value={{currentTeam, setCurrentTeam}}>
      {children}
    </teamContext.Provider>
  )
}

// you need to import departmentContextProvider in other files to use this
/*export const teamContext = React.createContext<teamValueType>({
  value: null,
  setValue: () => {},
});*/

interface teamSelectionInterface {
    value: string,
    label: string,
  }

type teamOptionsTypes = {
  selectedTeam: teamSelectionInterface[] | null, 
  setSelectedTeamList: React.Dispatch<React.SetStateAction<teamSelectionInterface[] | null>>
}

type selectedTeamContextProviderProps = {
  children: React.ReactNode
}

export const teamListContext = createContext<teamOptionsTypes | null>(null);

//export const teamListContext = createContext<OptionsTypes | null>(null);
export const TeamListContext = ({children}: selectedTeamContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedTeam, setSelectedTeamList] = useState<teamSelectionInterface[] | null>(null);
  return (
    <teamListContext.Provider value={{selectedTeam, setSelectedTeamList}}>
      {children}
    </teamListContext.Provider>
  )
}