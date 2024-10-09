import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// Component imports 
import CreatorCard from 'admin/components/CreatorCard';
import { Spinner } from 'components';
// Hooks
import useAuth from 'hooks/useAuth';

// API
import creatorsAPILink from 'api_link/creators';








const SelectReviewQuestions = () =>
{

   const { auth } = useAuth();
   const navigate = useNavigate();
   const [creators, setCreators] = useState([]);
   const [creatorLoading, setCreatorLoading] = useState(true);

   // Step 1 - Fetch all of the creators that can be reviewed
   useEffect(() =>
   {
      let creator_array = [];
      // Loop over each creator ID in auth.reviewable_creators
      const fetchReviewableCreators = async () =>
      {
         console.log(auth)
         console.log('reviewable creators:', auth.reviewable_creators)
         for (const creator_id of auth.reviewable_creators)
         {
            // Fetch the creator details
            const res = await creatorsAPILink.getCreator(creator_id);
            creator_array.push(res.data);
         }
      }

      const fetchAllCreators = async () =>
      {
         const res = await creatorsAPILink.getAll(auth.token);
         creator_array = res.data;
      }


      if (auth.role === 'ADMIN')
      {
         fetchAllCreators();
      } else if (auth.role === 'REVIEWER') {
         fetchReviewableCreators();
      }

      setCreators(creator_array);
      setCreatorLoading(false);
   }, [])


   const handleCreatorClick = (creator_id) =>
   {
      navigate(`/review-all-questions/${creator_id}`);
   }



   return(
      <>
         { creatorLoading ? <Spinner /> : (
            <>
               { creators.length === 0 ? <div>You are currently not set up to review any creators</div> : (
                  <>
                     { creators.map((creator, index) => (
                        <button key = { index } onClick={() => handleCreatorClick(creator._id)} className = "global-button global-trans-button">
                           <CreatorCard
                              name = { creator.name }
                              image = { creator.profile_pic }
                           /> 
                        </button>
                     ))}
                  </>
               )}
            </>
         )}
      </>
   )

   
}


export default SelectReviewQuestions;