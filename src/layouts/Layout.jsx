import { Outlet } from "react-router-dom";

import useAuth from "hooks/useAuth";

import Header from './Header';

import 'styles/layouts/layout.css';



const Layout = () => {

   const { loading } = useAuth();

   if ( loading ) {
      return <div className = "flex-public-layout-container"></div>;
   }

   return (
         <div className = "flex-public-layout-container"> 
            <div className = "flex-navbar-container">
               < Header />
               </div>         
            <div className = "main-container">
               < Outlet />
            </div>
         </div>
   )
}

export default Layout