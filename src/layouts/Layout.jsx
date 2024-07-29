import { Outlet } from "react-router-dom";
import { useState } from "react";

import useAuth from "hooks/useAuth";

import Header from './Header';
import SideBar from './SideBar'

import 'styles/layouts/layout.css';



const Layout = () => {

   const { loading } = useAuth();

   const [menuToggled, setMenuToggled] = useState(false);

   if ( loading ) {
      return <div className = "flex-public-layout-container"></div>;
   }

   return (
         <>
         <div className = "flex-public-layout-container"> 
            <header className = "flex-navbar-container">
               < Header setMenuToggled = { setMenuToggled }/>
            </header>         
            <div className = "main-container">
            { menuToggled && <div className = "left-sidebar"> <SideBar /></div> }
               <div className = "flex-right-container">
                  < Outlet />
               </div>
            </div>
         </div>
         </>
   )
}

export default Layout