import { createContext, useState } from 'react';

const CreatorContext = createContext();

export const CreatorProvider = ({ children }) => {
   const [creatorData, setCreatorData] = useState([]);
   const [moduleData, setModuleData] = useState([]);

   return (
      <CreatorContext.Provider value={{ creatorData, setCreatorData, moduleData, setModuleData }}>
         {children}
      </CreatorContext.Provider>
   )
}

export default CreatorContext;