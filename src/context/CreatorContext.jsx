import { createContext, useState } from 'react';

const CreatorContext = createContext();

export const CreatorProvider = ({ children }) => {
   const [creatorData, setCreatorData] = useState([]);
   const [moduleSummary, setModuleSummary] = useState([]);

   return (
      <CreatorContext.Provider value={{ creatorData, setCreatorData, moduleSummary, setModuleSummary }}>
         {children}
      </CreatorContext.Provider>
   )
}

export default CreatorContext;