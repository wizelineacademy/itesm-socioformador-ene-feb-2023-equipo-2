import { createContext, useState } from 'react'

type departmentOptions = { 
  value: string,
  label: string,
}

type departmentOptionsTypes = {
  selectedDepartment: departmentOptions | null, 
  setSelectedDepartment: React.Dispatch<React.SetStateAction<departmentOptions | null>>
}

type selectedDepartmentContextProviderProps = {
  children: React.ReactNode
}

export const departmentContext = createContext<departmentOptionsTypes | null>(null);

// you need to import departmentContextProvider in other files to use this
export const DepartmentContextProvider = ({children}: selectedDepartmentContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [selectedDepartment, setSelectedDepartment] = useState<departmentOptions | null>(null);
  return (
    <departmentContext.Provider value={{selectedDepartment, setSelectedDepartment}}>
      {children}
    </departmentContext.Provider>
  )
}