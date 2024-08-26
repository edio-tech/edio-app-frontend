import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, CircleUserRound  } from "lucide-react";
import Lottie from 'lottie-react';


// Hooks
import useAuth from "hooks/useAuth";

// Styling
import edioAnimation from '../assets/edio-loading.json';
import EdioText from "assets/edio-animation-first-frame.png"
import 'styles/layouts/header.css';
import HeaderNavigationLinks from "components/HeaderNavigationLinks";

const Header = ({ setMenuToggled }) => {

   const { auth } = useAuth();
   const navigate = useNavigate();

   const [togglePopUp, setTogglePopUp] = useState(false);
   const dropdownRef = useRef(null);

   const [aspectRatio, _] = useState(250/117);


   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setTogglePopUp(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   const handleLoginClick = () => { navigate('/login') }
   const handleAccountSettingsClick = () => { navigate('/account-settings') }
   const handleLogoutClick = () => { navigate('/logout') }

   const handleToggleMenuClick = () => { setMenuToggled(prevState => !prevState) }

   const handleUserIconClick = () => { setTogglePopUp(!togglePopUp) }

   return (
      <>
      <div className = "flex-left-side-navbar">
         {/* <div className = "left-menu-navbar-element">
            <button onClick={() => handleToggleMenuClick()} className = "global-button global-trans-button flex-left-menu-button"><Menu style = {{ color : 'black'}}/></button>
         </div> */}
         <Link to='/' className = "flex-navbar-element">
            {/* <img className = "edio-navbar-text" src={EdioText} /> */}
            <div
               style={{ height: 65, aspectRatio: aspectRatio }}
            >
               <Lottie animationData={edioAnimation} autoPlay loop />
            </div>
         </Link>
         <div className = "navbar-element">
         </div>
      </div>

      <HeaderNavigationLinks />

      <div className = "flex-right-side-navbar">
         <div className="flex-navbar-element">
            {
               auth?.id ? 
               <>
                  <div className = "dropdown-container" ref={dropdownRef}>
                  <button onClick={() => handleUserIconClick()} className = "global-trans-button"><CircleUserRound className = "user-symbol"/></button>
                  { togglePopUp &&(
                  <>
                     <div className = "popup-overlay">
                        <div className="popup-element"> <button onClick={() => handleAccountSettingsClick()} className="global-trans-button big-button-writing">Account Settings</button></div>
                        <div className="popup-element"> <button onClick={() => handleLogoutClick()} className="global-trans-button big-button-writing">Logout</button></div>
                     </div>
                  </>
                  )}
               </div>
               </> : <>
                  <button onClick={() => handleLoginClick()} className = "login-navbar-button"> LOG IN </button>
               </>
            }
         </div>
      </div>
      </>
   )
}

export default Header;
