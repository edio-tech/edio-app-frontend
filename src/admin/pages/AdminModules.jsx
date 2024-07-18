// React imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// API imports
import creatorsAPI from "api_link/creators.js";

// Componenet imports
import { Spinner } from 'components';
import CreatorCard from 'admin/components/CreatorCard';

// Context imports
import useLogContext from "hooks/useLogContext";
import useCreatorContext from "hooks/useCreatorContext";

// Styling
import "styles/admin/adminmodules.css";



const AdminModules = () => {

  const { creator_id } = useParams();
  const navigate = useNavigate();
  const { development } = useLogContext();

  const [pageRendering, setPageRendering] = useState(true);
  const [hasModules, setHasModules] = useState(true);
  const [errors, setErrors] = useState(null);

  const { moduleSummary } = useCreatorContext();
  const [currentModuleData, setCurrentModuleData] = useState();

  useEffect(() => {
    
    const checkCreatorModules = async () => {
      try {
        const res = await creatorsAPI.getCreator(creator_id)
    
        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          if ( development ) {
            setErrors(res.data.detail)
          } else {
            setErrors('Creator Not Found')
          }
          return
        }

        if ( Object.keys(res.data).length > 0 ) {
          // Creator has modules, but moduleData is empty, likely due to a refresh
          navigate('/admin/all-creators')
        } else {
          setHasModules(false)
        }
      } catch (err) {
        setErrors(err.message);
        if ( development ) {
          console.log(err.message)
        }
      } finally {
        setPageRendering(false);
      }
    }

    if ( moduleSummary.length === 0 ) {
      // If there are not modules stored in creator context, check to see if modules exist
      checkCreatorModules();
    } else {
      const filteredModules = moduleSummary.filter(module => module.creator_id === creator_id);
      setCurrentModuleData(filteredModules);
      if ( filteredModules.length == 0 ) {
        setHasModules(false)
      }
      setPageRendering(false);
    }

    

  }, [])


  const handleBackClick = () => {
    navigate('/admin/all-creators')
  }

  const handleAddModuleClick = () => {
    navigate(`/admin/add-module/${creator_id}`)
  }

  const handleModuleClick = (module_id) => {
    navigate(`/admin/module/${creator_id}/${module_id}`)
  }

  return (
    <>
      <div className = "flex-container-col">
        <div className="flex-top-bar">
          <div className="flex-bar-left">
            <div className="top-bar-item">
              <button className="global-button global-trans-button" onClick={() => handleBackClick()}> BACK </button>
            </div>
          </div>
          <div className="flex-bar-right">
            <div className="top-bar-item">
              <button className="global-button global-trans-button" onClick={() => handleAddModuleClick()}> ADD MODULE </button>
            </div>
          </div>
        </div>
        { pageRendering &&
          <div className = "flex-content"><Spinner /> </div>
        }
        { !pageRendering && !hasModules &&
          <div className = "flex-content"> No modules Found for this Creator </div>
        }
        { !pageRendering && hasModules &&
          <>
            <div className = "flex-content">
              { errors &&
                <div>{ errors }</div>
              }
              { !errors && 
                currentModuleData.map((module, index) => (
                  <button key = { index } onClick={() => handleModuleClick(module.id)} className = "global-button global-trans-button">
                    <CreatorCard
                      name = { module.module_name }
                      image = { module.module_image }
                    /> 
                  </button>
                ))
              }
          </div>
          </>
        }
      </div>
    </>
  )
}

export default AdminModules