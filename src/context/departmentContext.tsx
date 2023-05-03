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

/*type field = {
  selectedField: string;
  setSelectedField: () => void;
}

const fieldExample: field = {
  selectedField: "",
  setSelectedField: () => {}
}

type props = {children: ReactNode}

export const Contexto = createContext<field>(fieldExample);

function ContextoFunc({children}: props) {
  const [selectedField, setSelectedField] = useState<field>(fieldExample);
  return(
    <Contexto.Provider value={{selectedField, setSelectedField}}>
      {children}
    </Contexto.Provider>
  )
}

export default ContextoFunc;*/