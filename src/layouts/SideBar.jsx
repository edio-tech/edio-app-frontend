import { House, CircleUserRound, CircleHelp, Cookie, PanelTopDashed, Axe } from "lucide-react"
import { useNavigate } from "react-router-dom"

import useAuth from "hooks/useAuth"

import "styles/layouts/sidebar.css"

const SideBar = () => {

   const { auth } = useAuth();

   const navigate = useNavigate();

   const handleAdminCreatorsClick = () => { navigate('/admin/all-creators') }
   const handleAdminDemoClick = () => { navigate('/admin/demo') }

   const handleHomeClick = () => { navigate('/') }
   const handleLoginClick = () => { navigate('/login') }
   const handleHelpClick = () => { navigate('/support') }
   const handlePrivacyClick = () => { navigate('/privacy') }


   return (
      <div className = "flex-full-sidebar">
         { auth?.id ? 
         <>
         { auth.role === 'ADMIN' &&
         <>
            <div className = "flex-sidebar-element">
               <div className = "sidebar-logo"> <PanelTopDashed /> </div>
               <button onClick={() => handleAdminCreatorsClick()} className = "global-trans-button sidebar-text">Creators</button>
            </div>
            <div className = "flex-sidebar-element">
               <div className = "sidebar-logo"> <Axe /></div>
               <button onClick={() => handleAdminDemoClick()} className = "global-trans-button sidebar-text">Demo</button>
            </div>
         </>
         }
         </> : <>
         <div className = "flex-sidebar-element">
            <div className = "sidebar-logo"> < House/> </div>
            <button onClick={() => handleHomeClick()} className = "global-trans-button sidebar-text">Home</button>
         </div>
         <div className = "flex-sidebar-element">
            <div className = "sidebar-logo"> <CircleUserRound /> </div>
            <button onClick={() => handleLoginClick()} className = "global-trans-button sidebar-text">Log In</button>
         </div>
         </>
         }
         <div className = "white-line-container">
            <div className="white-line white-line-width"></div>
         </div>
         <div className = "flex-sidebar-element">
            <div className = "sidebar-logo"> <CircleHelp /> </div>
            <button onClick={() => handleHelpClick()} className = "global-trans-button sidebar-text">Help</button>
         </div>
         <div className = "flex-sidebar-element">
            <div className = "sidebar-logo"> <Cookie /> </div>
            <button onClick={() => handlePrivacyClick()} className = "global-trans-button sidebar-text">Privacy</button>
         </div>
         <div className = "white-line-container">
            <div className="white-line white-line-width"></div>
         </div>
      </div>
   )
}

export default SideBar