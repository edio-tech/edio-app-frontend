// React / React Library imports
import { useState, useEffect } from 'react';

// API imports
import creatorsAPI from 'api_link/creators.js';

// Component imports 
import CreatorCard from 'admin/components/CreatorCard';

// Context imports
import useLogContext from 'hooks/useLogContext';

// Styling
import "styles/admin/creators.css";


const AdminCreators = () => {

   const [pagerendering, setPageRendering] = useState(true);
   const { development } = useLogContext();
   const [creatordata, creatorData] = useState([]);
   const [errors, setErrors] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         const res = await creatorsAPI.getAll()

         if ( res['status'] !== 200) {
            let errors = await res['data']
            /* Add a way to display errors */
            if ( development ) {
               console.log('Failed to retrieve Creators.', errors)
            }
            setErrors(errors);
            setPageRendering(false);
            return
         }

         console.log('Incoming Creator Data:',res.data);
         creatorData(res.data);
         setPageRendering(false);
      }

      fetchData();
   }, [])

   if ( pagerendering ) {
      return <div className = "flex-page-container"> Loading ... Please Wait </div>
   }

   if ( creatordata.length === 0 ) {
      return <div className = "flex-page-container"> No creators Found </div>
   }

   return (
      <div className = "flex-page-container"> 
         { creatordata.map((creator, index) => (
            <button key = { index } className = "global-button global-trans-button">
               <CreatorCard
                  name = { creator.name }
                  image = { creator.profile_pic }
               /> 
            </button>
         ))}
      </div>
   )
}

export default AdminCreators;