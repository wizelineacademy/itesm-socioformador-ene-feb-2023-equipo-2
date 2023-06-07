import { createContext, useState } from 'react';
import React from 'react';

type currentTeamOptionsTypes = {
  currentTeam: string | null, 
  setCurrentTeam: React.Dispatch<React.SetStateAction<string | null>>
}

type currentTeamContextProviderProps = {
  children: React.ReactNode
}

export const teamContext = createContext<currentTeamOptionsTypes | null>(null);

//export const TeamContext = createContext<teamOptionsTypes | null>(null);
export const TeamContext = ({children}: currentTeamContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);
  return (
    <teamContext.Provider value={{currentTeam, setCurrentTeam}}>
      {children}
    </teamContext.Provider>
  )
}

//------------------------------------------------------------------------------------

type teamSelectionInterface = {
  value: string;
  label: string;
  isactive: string;
}

type teamOptionsTypes = {
  selectedTeam: teamSelectionInterface[] | null, 
  setSelectedTeamList: React.Dispatch<React.SetStateAction<teamSelectionInterface[] | null>>
}

type selectedTeamContextProviderProps = {
  children: React.ReactNode
}

export const teamListContext = createContext<teamOptionsTypes | null>(null);

//export const ClientListContext = createContext<clientOptionsTypes | null>(null);
export const TeamListContext = ({children}: selectedTeamContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedTeam, setSelectedTeamList] = useState<teamSelectionInterface[] | null>(null);
  return (
    <teamListContext.Provider value={{selectedTeam, setSelectedTeamList}}>
      {children}
    </teamListContext.Provider>
  )
}

//------------------------------------------------------------------------------------

type teamStatusOptionsTypes = {
  selectedTeamStatus: string | null, 
  setSelectedTeamStatus: React.Dispatch<React.SetStateAction<string | null>>
}

type selectedTeamStatusContextProviderProps = {
  children: React.ReactNode
}

export const teamStatusContext = createContext<teamStatusOptionsTypes | null>(null);

//export const TeamContext = createContext<teamOptionsTypes | null>(null);
export const TeamStatusContext = ({children}: selectedTeamStatusContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedTeamStatus, setSelectedTeamStatus] = useState<string | null>(null);
  return (
    <teamStatusContext.Provider value={{selectedTeamStatus, setSelectedTeamStatus}}>
      {children}
    </teamStatusContext.Provider>
  )
}
