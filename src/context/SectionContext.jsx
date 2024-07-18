import { createContext, useState } from 'react';

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
   const [sectionData, setSectionData] = useState([]);

   return (
      <SectionContext.Provider value={{ sectionData, setSectionData }}>
         {children}
      </SectionContext.Provider>
   )
}

export default SectionContext;