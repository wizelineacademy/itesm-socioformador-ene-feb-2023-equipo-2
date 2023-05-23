import { createContext, useState } from 'react';
import React from 'react';

type currentProjectOptionsTypes = {
  currentProject: string | null, 
  setCurrentProject: React.Dispatch<React.SetStateAction<string | null>>
}

type currentProjectContextProviderProps = {
  children: React.ReactNode
}

export const projectContext = createContext<currentProjectOptionsTypes | null>(null);

//export const ProjectContext = createContext<projectOptionsTypes | null>(null);
export const ProjectContext = ({children}: currentProjectContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  return (
    <projectContext.Provider value={{currentProject, setCurrentProject}}>
      {children}
    </projectContext.Provider>
  )
}

//------------------------------------------------------------------------------------

type projectSelectionInterface = {
  value: string;
  label: string;
  orderstatus: string;
  orderstartdate: string; 
  orderenddate: string; 
  idclient: string;
  clientname: string; 
  idteam: string;
  teamname: string;
}

type projectOptionsTypes = {
  selectedProject: projectSelectionInterface[] | null, 
  setSelectedProjectList: React.Dispatch<React.SetStateAction<projectSelectionInterface[] | null>>
}

type selectedProjectContextProviderProps = {
  children: React.ReactNode
}

export const projectListContext = createContext<projectOptionsTypes | null>(null);

//export const ClientListContext = createContext<clientOptionsTypes | null>(null);
export const ProjectListContext = ({children}: selectedProjectContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedProject, setSelectedProjectList] = useState<projectSelectionInterface[] | null>(null);
  return (
    <projectListContext.Provider value={{selectedProject, setSelectedProjectList}}>
      {children}
    </projectListContext.Provider>
  )
}

//------------------------------------------------------------------------------------

type statusOptionsTypes = {
  selectedStatus: string | null, 
  setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>
}

type selectedStatusContextProviderProps = {
  children: React.ReactNode
}

export const statusContext = createContext<statusOptionsTypes | null>(null);

//export const ProjectContext = createContext<projectOptionsTypes | null>(null);
export const StatusContext = ({children}: selectedStatusContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  return (
    <statusContext.Provider value={{selectedStatus, setSelectedStatus}}>
      {children}
    </statusContext.Provider>
  )
}