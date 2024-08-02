import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { BeatLoader } from 'react-spinners';


// API imports
import modulesAPI from "api_link/modules.js"

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Context imports
import useLogContext from "hooks/useLogContext";
import useCreatorContext from "hooks/useCreatorContext"; 

// Styling
import "styles/admin/admindeletemodule.css"

const AdminDeleteModule = () => {

  const navigate = useNavigate();
  const { development } = useLogContext();
  const { creator_id, module_id } = useParams();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState(null)

  const { setCreatorData, setModuleSummary } = useCreatorContext(); 

  const { setLeftName, setLeftAction, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    setLeftName('Module');
    setLeftAction(() => () => navigate(`/admin/module/${creator_id}/${module_id}`));
    setRightName('');
    setRightAction(null);
  }, [])

   const handleDeleteClick = async () => {
    setLoading(true);
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

         // Update creatorData
        setCreatorData(prevData => {
          return prevData.map(creator => {
            if (creator._id === creator_id) {
              const updatedModules = { ...creator.modules };
              delete updatedModules[module_id];
              return { ...creator, modules: updatedModules };
            }
            return creator;
          });
        });

        // Update moduleSummary
        setModuleSummary(prevSummary => {
          return prevSummary.filter(module => module.id !== module_id);
        });

        navigate(`/admin/all-modules/${creator_id}`)
 
      } catch (err) {
        setErrors(err.message);
        if ( development ) {
          console.log(err.message)
        }
      } finally {
        setLoading(false);
      }
   }

  return (
    <div className = "container-flex">
      <div className = "flex-body">
        <h2 style = {{textAlign : "center"}}> Are you sure you want to delete this module? This will delete all parts, chapters, sections, goals and questions associated with this module. This action cannot be undone.</h2>
        <button style = {{marginTop : "50px"}} onClick={() => handleDeleteClick()} className = "global-button delete-button"> 
          {loading ? <BeatLoader /> : 'DELETE MODULE '}
        </button>
         {errors && <div> There was an error deleting module: {errors}</div>}
      </div>
    </div>
  )
}

export default AdminDeleteModule