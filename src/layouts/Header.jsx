import { Link, useNavigate } from "react-router-dom";
import { Menu, CircleUserRound  } from "lucide-react";

import useAuth from "hooks/useAuth";

import EdioLogo from "assets/logo.png"
import EdioText from "assets/edio-white-transparent.png"
import 'styles/layouts/header.css';

const Header = ({ setMenuToggled }) => {

   const { auth } = useAuth();
   const navigate = useNavigate();

   const handleLoginClick = () => {
      navigate('login')
   }

   const handleToggleMenuClick = () => {
      setMenuToggled(prevState => !prevState)
   }

   return (
      <>
      <div className = "flex-left-side-navbar">
         <div className = "left-menu-navbar-element">
            <button onClick={() => handleToggleMenuClick()} className = "global-button global-trans-button flex-left-menu-button"><Menu style = {{ color : 'white'}}/></button>
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

