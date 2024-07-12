// React / React Library imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// API imports
import creatorsAPI from 'api_link/creators.js';

// Component imports 
import CreatorCard from 'admin/components/CreatorCard';
import { Spinner } from 'components';

// Context imports
import useLogContext from 'hooks/useLogContext';

// Styling
import "styles/admin/admincreators.css";


const AdminCreators = () => {

   const [pagerendering, setPageRendering] = useState(true);
   const { development } = useLogContext();
   const [creatordata, creatorData] = useState([]);
   const [errors, setErrors] = useState(null);

   const navigate = useNavigate();

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

   const handleClick = (creator_id) => {
      navigate(`/admin/all-modules/${creator_id}`)
   }

   if ( pagerendering ) {
      return <div className = "flex-page-container"> <Spinner /> </div>
   }

   if ( creatordata.length === 0 ) {
      return <div className = "flex-page-container"> No creators Found </div>
   }

   return (
      <div className = "flex-page-container"> 
         { creatordata.map((creator, index) => (
            <button key = { index } onClick={() => handleClick(creator._id)} className = "global-button global-trans-button">
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