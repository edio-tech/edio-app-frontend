// React / React Library imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// API imports
import creatorsAPI from 'api_link/creators.js';

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Component imports 
import CreatorCard from 'admin/components/CreatorCard';
import { Spinner } from 'components';

// Context imports
import useLogContext from 'hooks/useLogContext';
import useCreatorContext from 'hooks/useCreatorContext';

// Styling
import "styles/admin/admincreators.css";


const AdminCreators = () => {

   const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

   useEffect(() => {
      setLeftName('');
      setLeftAction(null);
      setTitleName('All Creators');
      setRightName('Add Creator');
      setRightAction(() => () => navigate('/admin/all-creators/add-creator'));
   }, [])

   const [pageRendering, setPageRendering] = useState(false);
   const { development } = useLogContext();
   const { creatorData, setCreatorData, setModuleSummary } = useCreatorContext();
   const [errors, setErrors] = useState(null);

   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = Cookies.get('jwtToken')
            const res = await creatorsAPI.getAll(token)
         
            if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
               throw new Error(`${res.data}. Status: ${res.status}`);
            }

            // Construct the Module Data for each Creator to store in context
            const creators = res.data
            const allModules = []

            creators.forEach(creator => {
               if ( creator.modules ) {
                  const creatorModules = Object.keys(creator.modules).map(key => ({
                     id: key,
                     creator_id: creator._id,
                     ...creator.modules[key]
                  }));
                  allModules.push(...creatorModules)
               }
            });
         setCreatorData(creators);
         setModuleSummary(allModules);

         } catch (err) {
            setErrors(err);
            if ( development ) {
              console.log(err.message)
            }
         } finally {
            setPageRendering(false);
         }

      }
      if ( creatorData.length === 0 ) {
         setPageRendering(true);
         fetchData();
      }
   }, [])

   const handleClick = (creator_id) => {
      navigate(`/admin/all-modules/${creator_id}`)
   }

   return (
      <div className = "flex-page-container"> 
      { pageRendering && <Spinner />}
      { !pageRendering && creatorData.length === 0 && <div>No Creators Found</div>}
      {! pageRendering && creatorData.length !== 0 &&
      <>
         { creatorData.map((creator, index) => (
            <button key = { index } onClick={() => handleClick(creator._id)} className = "global-button global-trans-button">
               <CreatorCard
                  name = { creator.name }
                  image = { creator.profile_pic }
               /> 
            </button>
         ))}
      </>
      }
      </div>
   )
}

export default AdminCreators;