// React / React Library imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// API imports
import creatorsAPI from 'api_link/creators.js';

// Component imports
import CreatorCard from 'admin/components/CreatorCard';

// Context imports
import useLogContext from 'hooks/useLogContext';

// Styling
import "styles/admin/demohome.css";

const DemoHome = () => {

   const [pagerendering, setPageRendering] = useState(true);
   const navigate = useNavigate();
   const { development } = useLogContext();

   const [democreatorinfo, setDemoCreatorInfo] = useState([]);
   const [errors, setErrors] = useState(null);

   useEffect(() => {

      const fetchData = async () => {
         try {
            const res = await creatorsAPI.getCreator('66867e93f958ab810f89b117') // Have Ross's creator ID hard coded for demo
            
            if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
               throw new Error(`Failed to fetch demo module info. Status: ${res.status}`);
            }

            let content = res.data;
            if ( development ) {
               console.log('content:',content)
            } 
            setDemoCreatorInfo([content]);
         } catch (err) {
            setErrors(err.message);
            if ( development ) {
               console.log(err.message)
            }
         } finally {
            setPageRendering(false)
         }
      }
      fetchData();
   }, [])

   const createDemoButton = () => {
      navigate('create-demo')
   }

   if ( pagerendering ) {
      return (
         <div className = "flex-demo-container"> 
            <div className = "top-bar">
               <button className = "create-demo-button global-button" onClick={createDemoButton}> Create Demo </button>
            </div>
            <div className = "flex-demo-display">
               Loading ... Please Wait   
            </div>
         </div>
      )
   }
   
   if ( democreatorinfo === null ) {
      return (
         <div className = "flex-demo-container">  
            <div className = "top-bar">
               <button className = "create-demo-button global-button" onClick={createDemoButton}> Create Demo </button>
            </div>
            <div className = "flex-demo-display">
               No Demo Modules Found 
            </div>
         </div>
      )
   }


   return (
      <div className = "flex-demo-container">
         <div className = "top-bar">
            <button className = "create-demo-button global-button" onClick={createDemoButton}> Create Demo </button>
         </div>
         <div className = "flex-demo-display">
            {democreatorinfo.map((creator) => (
               <div key = { creator._id } className = "demo-object"> 
                  {Object.entries(creator.modules).map(([moduleId, moduleData]) => (
                     <button key = { moduleId } className = "global-trans-button global-button">
                        <CreatorCard 
                           name = { moduleData.module_name}
                           image = { moduleData.module_image}
                        />
                     </button>
                  ))}
               </div>
            ))}
         </div>
      </div>
   )
}

export default DemoHome;