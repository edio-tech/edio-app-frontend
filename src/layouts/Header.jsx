import { Link } from "react-router-dom";

import useAuth from "hooks/useAuth";

import 'styles/layouts/header.css';

const Header = () => {

   const { auth } = useAuth();
   
   return (
      <>
      { 
         auth?.id ? <>
            { auth.role === 'ADMIN' &&
            <>
               <Link to='/demo' className="flex-navbar-element global-button">
                  DEMOS
               </Link>
               <Link to='/all-creators' className="flex-navbar-element global-button">
                  ADMIN
               </Link>
            </>
            }
            {/* 
            <Link to='/explore-creators' className="flex-navbar-element global-button">
               CREATORS
            </Link>
            */}
         </> : <>
            <Link to='/' className="flex-navbar-element global-button">
               HOME
            </Link>
            <Link to='/login' className="flex-navbar-element global-button">
               LOGIN
            </Link> 
         </>
      }
      </>
   );
};

export default Header;