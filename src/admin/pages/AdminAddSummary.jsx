import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

// API imports
import modulesAPI from "api_link/modules.js"

// Hook imports
import useLogContext from "hooks/useLogContext";

// Styling imports
import "styles/admin/adminaddsummary.css"

const AdminAddSummary = () => {

   const { creator_id, module_id, section_id } = useParams();
   const navigate = useNavigate();
   const { development } = useLogContext();
   const [errors, setErrors] = useState();

   const [summary, setSummary] = useState();

   const handleGenerateSummaryClick = async () => {
      console.log('clicked!')

      try {
        const res = await modulesAPI.addSectionContentSummary(section_id)
        if (res.status < 200 || res.status >= 300) { 
          console.log(`An error occurred when converting the PDF to markdown. Status: ${res.status}`)
          throw new Error('Unable to convert the PDF to markdown');
        }
        const content = res.data
        if ( development ) {
         console.log(content.detail)
        }
        setSummary(content.data)
      } catch (err) {
        setErrors(err);
        return
      }
   }

   const handleFinishedClick = async () => {
      navigate(`/admin/module/${creator_id}/${module_id}`)
   }

  return (
   <div className = "flex-container-col">
   { ! summary &&
   <button onClick={() => handleGenerateSummaryClick()} className = "global-button"> GENERATE SUMMARY </button>
   }  
   { summary &&
   <>
      <div className = "top-bar"> <button onClick={() => handleFinishedClick()} className="global-button">DONE</button></div>
      <div className = "summary-content">{summary}</div> 
   </>
   }
 </div>
  )
}

export default AdminAddSummary;