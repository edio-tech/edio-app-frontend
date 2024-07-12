// React imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// API imports
import creatorsAPI from "api_link/creators.js";


// Componenet imports
import CreatorCard from 'admin/components/CreatorCard';

// Context imports
import useLogContext from "hooks/useLogContext";

// Styling
import "styles/admin/adminmodules.css";



const AdminModules = () => {

  const { creator_id } = useParams();
  const navigate = useNavigate();
  const { development } = useLogContext();

  const [pageRendering, setPageRendering] = useState(true);
  const [errors, setErrors] = useState(null);

  const [moduledata, setModuleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await creatorsAPI.getCreator(creator_id)
    
        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          throw new Error(`Failed to fetch creators module info. Status: ${res.status}`);
        }

        let content = res.data
        let modules_data = content.modules
        let modulesArray = Object.keys(modules_data).map(key => ({
          id: key,
          ...modules_data[key]
        }));
        setModuleData(modulesArray)
        if ( development ) {
          console.log('content:',content)
        } 

      } catch (err) {
        setErrors(err);
        if ( development ) {
          console.log(err.message)
        }
      }
    }

    fetchData();
  }, [creator_id])


  const handleBackClick = () => {
    navigate('/admin/all-creators')
  }

  const handleAddModuleClick = () => {
    navigate(`/admin/add-module/${creator_id}`)
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
        <div className = "flex-content">
          {moduledata.map((module, index) => (
            <button key = { index } className = "global-button global-trans-button">
            <CreatorCard
               name = { module.module_name }
               image = { module.module_image }
            /> 
         </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default AdminModules