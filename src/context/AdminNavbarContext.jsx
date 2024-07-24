import { createContext, useState } from 'react';

const AdminNavbarContext = createContext();

export const AdminNavbarProvider = ({ children }) => {
   const [leftName, setLeftName] = useState([]);
   const [leftAction, setLeftAction] = useState([]);

   const [titleName, setTitleName] = useState([]);

   const [rightName, setRightName] = useState([]);
   const [rightAction, setRightAction] = useState([]);

   return (
      <AdminNavbarContext.Provider value={{ leftName, setLeftName, leftAction, setLeftAction, titleName, setTitleName, rightName, setRightName, rightAction, setRightAction }}>
         {children}
      </AdminNavbarContext.Provider>
   )
}

export default AdminNavbarContext;