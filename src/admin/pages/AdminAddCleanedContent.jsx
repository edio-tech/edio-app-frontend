import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';


// API imports
import questionGenAPI from "api_link/question_generation.js"

// Component imports
import { Spinner } from 'components';

// Hook imports
import useLogContext from "hooks/useLogContext";
import useAdminNavbar from "hooks/useAdminNavbar";

// Styling imports
import "styles/admin/adminaddcleanedcontent.css"

const AdminAddCleanedContent = () => {

   const { creator_id, module_id, section_id } = useParams();
   const navigate = useNavigate();
   const { development } = useLogContext();

   const [errors, setErrors] = useState();
   const [loading, setLoading] = useState(false); 
   const [cleanedContent, setCleanedContent] = useState();

   const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    setLeftName('Module Overview');
    setLeftAction(() => () => navigate(`/admin/module/${creator_id}/${module_id}`));
    setTitleName('Generate Cleaned Content');
    setRightName('');
    setRightAction(null);
  }, [])

  const handleGenerateCleanedContentClick = async () => {
    setLoading(true);

    try {
      const res = await questionGenAPI.cleanContentFromSection(section_id)
      if (res.status < 200 || res.status >= 300) { 
        console.log(`An error occurred when generating the cleaned content. Status: ${res.status}`)
        throw new Error('Unable to generate cleaned content');
      }
      const content = res.data
      if ( development ) {
        console.log(content.detail)
      }
      setCleanedContent(content.data)
      
    } catch (err) {
      setErrors(err);
      return
    } finally {
      setLoading(false);
    }
  }

   const handleFinishedClick = async () => {
      navigate(`/admin/module/${creator_id}/${module_id}`)
   }

  return (
    <div className = "flex-container-col">
    { ! cleanedContent &&
    <>
      { loading ? ( <Spinner /> ) : ( 
        <button onClick={() => handleGenerateCleanedContentClick()} className = "global-button"> GENERATE CLEANED CONTENT </button>
      )}
    </>
    }  
    { cleanedContent &&
    <>
      <div className = "top-bar"> <button onClick={() => handleFinishedClick()} className="global-button">DONE</button></div>
      <div className = "cleaned-content"><ReactMarkdown>{cleanedContent}</ReactMarkdown></div> 
    </>
    }
  </div>
  )
}

export default AdminAddCleanedContent;