import { useNavigate } from 'react-router-dom';

// Other imports
import Cookies from 'js-cookie';

// Hooks
import useAuth from '../hooks/useAuth';

import "styles/pages/logout.css"

const Logout = () => {

   const { setAuth } = useAuth();
   const navigate = useNavigate();

   const handleLogoutClick = () => {
      Cookies.remove('jwtToken');
      setAuth({});
      navigate('/')
   }

   return (
      <div className = "flex-container-col">
         <h2 className = "logout-title">
            Are you sure that you wish to Log Out?
         </h2>
         <button onClick={handleLogoutClick} className = "global-button logout-button"> LOG OUT </button>
      </div>
   )
}

export default Logout