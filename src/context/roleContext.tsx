import { createContext, useState } from 'react';
import React from 'react';

type currentRoleOptionsTypes = {
  currentRole: string | null, 
  setCurrentRole: React.Dispatch<React.SetStateAction<string | null>>
}

type currentRoleContextProviderProps = {
  children: React.ReactNode
}

export const roleContext = createContext<currentRoleOptionsTypes | null>(null);

//export const RoleContext = createContext<roleOptionsTypes | null>(null);
export const RoleContext = ({children}: currentRoleContextProviderProps) => {
  //return <departmentContext.Provider value={selectedDepartment}>{children}</departmentContext.Provider>
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  return (
    <roleContext.Provider value={{currentRole, setCurrentRole}}>
      {children}
    </roleContext.Provider>
  )
}
