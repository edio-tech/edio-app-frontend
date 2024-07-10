import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

import usersAPI from "api_link/users.js";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
   const [auth, setAuth] = useState({});
   const [loading, setLoading] = useState(true);

   async function checkUser() {
      const token = Cookies.get('jwtToken');

      if (token) {
         const userData = await usersAPI.checkDetails(token);

         if (userData['status'] === 200) {
            const userInfo = await userData['data'];
            userInfo['token'] = token;
            setAuth(userInfo);
            console.log('checking auth in context:',auth)
         }
         setLoading(false);
      } else {
         setLoading(false);
      }
   }
   useEffect(() => {
      checkUser();
   }, []);

   return (
      <AuthContext.Provider value={{auth, setAuth, loading}} >
         {children}
      </AuthContext.Provider>
   );
}

export default AuthContext;
