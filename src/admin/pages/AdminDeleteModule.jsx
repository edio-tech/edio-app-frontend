import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";

// API imports
import modulesAPI from "api_link/modules.js"

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Context imports
import useLogContext from "hooks/useLogContext";

// Styling
import "styles/admin/admindeletemodule.css"

const AdminDeleteModule = () => {

  const navigate = useNavigate();
  const { development } = useLogContext();
  const { creator_id, module_id } = useParams();

  const [errors, setErrors] = useState(null)

  const { setLeftName, setLeftAction, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    setLeftName('Module Info');
    setLeftAction(() => () => `/admin/module/${creator_id}/${module_id}`);
    setRightName('');
    setRightAction(null);
  }, [])

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
      <div className = "flex-body">
         <h2 style = {{textAlign : "center"}}> Are you sure you want to delete this module? This will delete all parts, chapters, sections, goals and questions associated with this module. This action cannot be undone.</h2>
         <button style = {{marginTop : "50px"}} onClick={() => handleDeleteClick()} className = "global-button delete-button"> DELETE MODULE </button>
      </div>
    </div>
  )
}

export default AdminDeleteModule