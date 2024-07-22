import { Outlet } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useAdminNavbar from "hooks/useAdminNavbar";

import "styles/layouts/admin/adminnavbar.css";

const AdminNavbar = () => {

   const { leftName, leftAction, titleName, rightName, rightAction } = useAdminNavbar();

  return (
   <>
      <div className = "flex-container-col">
         <div className = "flex-admin-navbar">
            <div className = "flex-left-navbar-section">
               { leftName && 
                  <button onClick={leftAction} className="global-trans-button admin-navbar-button">
                     <ChevronLeft /> <div> { leftName } </div>
                  </button>
               }
            </div>
            <div className = "flex-middle-navbar-section">
               <div className = "admin-navbar-title-text">{ titleName }</div>
            </div>
            <div className = "flex-right-navbar-section">
               { rightName && 
                  <button onClick={rightAction} className="global-trans-button admin-navbar-button">
                     <div> { rightName } </div> <ChevronRight/>   
                  </button>
               }
            </div>
         </div>
         <div className = "admin-content"> <Outlet /></div>
      </div>
   </>
  )
}

export default AdminNavbar