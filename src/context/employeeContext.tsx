import { createContext, useState } from 'react';
import React from 'react';

type currentEmployeeOptionsTypes = {
  currentEmployee: string | null, 
  setCurrentEmployee: React.Dispatch<React.SetStateAction<string | null>>
}

type currentEmployeeContextProviderProps = {
  children: React.ReactNode
}

export const employeeContext = createContext<currentEmployeeOptionsTypes | null>(null);

//export const ClientListContext = createContext<clientOptionsTypes | null>(null);
export const EmployeeContext = ({children}: currentEmployeeContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [currentEmployee, setCurrentEmployee] = useState<string | null>(null);
  return (
    <employeeContext.Provider value={{currentEmployee, setCurrentEmployee}}>
      {children}
    </employeeContext.Provider>
  )
}





type employeeSelectionInterface = {
  value: string,
  label: string,
  linkedinlink: string,
  cvfile: string,
  profileimg: string,
  inforoadmap: string,
  idposition: string,
  email: string,
  password: string,
  location: string,
  infoabout: string,
  status: string
}

type employeeOptionsTypes = {
  selectedEmployee: employeeSelectionInterface[] | null, 
  setSelectedEmployeeList: React.Dispatch<React.SetStateAction<employeeSelectionInterface[] | null>>
}

type selectedEmployeeContextProviderProps = {
  children: React.ReactNode
}

export const employeeListContext = createContext<employeeOptionsTypes | null>(null);

//export const ClientListContext = createContext<clientOptionsTypes | null>(null);
export const EmployeeListContext = ({children}: selectedEmployeeContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedEmployee, setSelectedEmployeeList] = useState<employeeSelectionInterface[] | null>(null);
  return (
    <employeeListContext.Provider value={{selectedEmployee, setSelectedEmployeeList}}>
      {children}
    </employeeListContext.Provider>
  )
}