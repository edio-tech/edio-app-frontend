import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import creatorsAPI from 'api_link/creators.js';
import useAdminNavbar from "hooks/useAdminNavbar";
import CreatorCard from 'admin/components/CreatorCard';
import { Spinner } from 'components';
import useLogContext from 'hooks/useLogContext';

import "styles/admin/admincreators.css";

const AdminCreators = () => {
   const [pageRendering, setPageRendering] = useState(false);
   const { development } = useLogContext();
   const [demoCreatorData, setDemoCreatorData] = useState([]);
   const [errors, setErrors] = useState(null);
   const navigate = useNavigate();

   const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

   useEffect(() => {
      setLeftName('');
      setLeftAction(null);
      setTitleName('Demo Page');
      setRightName();
      setRightAction(null);
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         try {
            setPageRendering(true);
            const res = await creatorsAPI.getCreator('66a52714c1848a675c08ef87'); // Hard coded for Founders inc demo
         
            if (res.status < 200 || res.status >= 300) {
               throw new Error(`${res.data}. Status: ${res.status}`);
            }

            const creators = res.data;
            setDemoCreatorData([creators]);

         } catch (err) {
            setErrors(err);
            if (development) {
              console.log(err.message);
            }
         } finally {
            setPageRendering(false);
         }
      };

      if (demoCreatorData.length === 0) {
         fetchData();
      }
   }, [demoCreatorData.length, development]);

   const handleClick = (creator_id) => {
      navigate(`/admin/demo/create-demo/${creator_id}`);
   };

   return (
      <div className="flex-page-container"> 
         {pageRendering && <Spinner />}
         {!pageRendering && demoCreatorData.length === 0 && <div>No Demos Found</div>}
         {!pageRendering && demoCreatorData.length !== 0 && (
            <>
               {demoCreatorData.map((creator, index) => (
                  <button key={index} onClick={() => handleClick(creator._id)} className="global-button global-trans-button">
                     <CreatorCard
                        name={creator.name}
                        image={creator.profile_pic}
                     /> 
                  </button>
               ))}
            </>
         )}
      </div>
   );
};

export default AdminCreators;