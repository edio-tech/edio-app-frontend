import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

// API imports
import modulesAPI from "api_link/modules.js"

// Context imports
import useLogContext from "hooks/useLogContext";

// Styling
import "styles/admin/admindeletemodule.css"

const AdminDeleteModule = () => {

  const navigate = useNavigate();
  const { development } = useLogContext();
  const { creator_id, module_id } = useParams();

  const [errors, setErrors] = useState(null)

   const handleBackClick = () => {
      navigate(`/admin/module/${creator_id}/${module_id}`)
   }

   const handleDeleteClick = async () => {
      try {
         const res = await modulesAPI.deleteModule(module_id)
 
         if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
           if ( development ) {
             setErrors(res.data.detail)
           } else {
             setErrors('Module unable to be delete.')
           }
           return
         }
 
         const content = res.data
         
         if ( development ) {
           console.log(content.detail)
         }

         navigate(`/admin/all-modules/${creator_id}`)
 
      } catch (err) {
         setErrors(err.message);
         if ( development ) {
           console.log(err.message)
         }
      } 
   }

  return (
    <div className = "container-flex">
      <div className="flex-top-bar">
         <button className="global-button global-trans-button" onClick={() => handleBackClick()}> BACK </button>
      </div>
      <div className = "flex-body">
         <h2> Are you sure you want to delete this module? This will delete all parts, chapters, sections, goals and questions associated with this module. This action cannot be undone.</h2>
         <button onClick={() => handleDeleteClick()} className = "global-button delete-button"> DELETE MODULE </button>
      </div>
    </div>
  )
}

export default AdminDeleteModule