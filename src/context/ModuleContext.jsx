import { createContext, useState } from 'react';

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
   const [moduleData, setModuleData] = useState([]);

   return (
      <ModuleContext.Provider value={{ 
         moduleData, 
         setModuleData, 
      }}>
         {children}
      </ModuleContext.Provider>
   )
}

export default ModuleContext;