import { Link, useNavigate } from "react-router-dom";
import { Menu, CircleUserRound  } from "lucide-react";

import useAuth from "hooks/useAuth";

import EdioLogo from "assets/logo.png"
import EdioText from "assets/edio-white-transparent.png"
import 'styles/layouts/header.css';

const Header = () => {

   const { auth } = useAuth();
   const navigate = useNavigate();

   const handleLoginClick = () => {
      navigate('login')
   }

   return (
      <>
      <div className = "flex-left-side-navbar">
         <div className = "left-menu-navbar-element">
            <button className = "global-button global-trans-button flex-left-menu-button"><Menu style = {{ color : 'white'}}/></button>
         </div>
         <Link to='/' className = "flex-navbar-element">
            <img className = "logo" src={EdioLogo} />
            <img className = "edio-navbar-text" src={EdioText} />
         </Link>
         <div className = "navbar-element">
         </div>
      </div>
      <div className = "flex-right-side-navbar">
         <div className="flex-navbar-element">
            {
               auth?.id ? 
               <>
                  <Link><CircleUserRound className = "user-symbol"/></Link>
               </> : <>
                  <button onClick={() => handleLoginClick()} className = "global-button login-navbar-button"> LOG IN </button>
               </>
            }
         </div>
      </div>
      </>
   )
}

const Bruh = () => {

   const { auth } = useAuth();
   
   return (
      <>
      { 
         auth?.id ? 
         <>
            { auth.role === 'ADMIN' &&
            <>
               <Link to='/admin/demo' className="flex-navbar-element global-button">
                  DEMOS
               </Link>
               <Link to='/admin/all-creators' className="flex-navbar-element global-button">
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