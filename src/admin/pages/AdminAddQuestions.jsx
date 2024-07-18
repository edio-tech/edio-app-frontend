import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// API imports
import QuestionGenerationAPI from "api_link/question_generation.js"
import QuestionAPI from "api_link/questions.js"

// Component imports
import { Spinner } from 'components';

// Context imports
import useLogContext from "hooks/useLogContext";


const AdminAddQuestions = () => {

  const [pageRendering, setPageRendering] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const development = useLogContext();
  const navigate = useNavigate();

  const { creator_id, module_id, section_id } = useParams();

  const handleBackClick = () => {
    navigate(`/admin/module/${creator_id}/${module_id}`)
  }

  const handleGenerateClick = async () => {

    setLoading(true);

    try {
      const res = await QuestionGenerationAPI.bodyMarkdownToGoalsFromDatabase(section_id)

      if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
        if ( development ) {
          setErrors(res.data.detail)
        } else {
          setErrors('Unable to generate goals')
        }
        return
      }

      const content = res.data
      if ( development ) {
        console.log(content.detail)
      }

      const res_2 = await QuestionGenerationAPI.goalsToQuestionsFromContentInDatabase(section_id)

      if (res_2.status < 200 || res_2.status >= 300) { // Check if response status is not OK (200-299)
        if ( development ) {
          setErrors(res.data.detail)
        } else {
          setErrors('Unable to generate questions from goals')
        }
        return
      }

      const content_2 = res_2.data
      const goals_and_questions = content_2.data
      
      if ( development ) {
        console.log(content_2.detail)
      }

      const res_3 = await QuestionAPI.addMultipleGoalsAndQuestions(section_id, goals_and_questions)

      if (res_3.status < 200 || res_3.status >= 300) { // Check if response status is not OK (200-299)
        if ( development ) {
          setErrors(res.data.detail)
        } else {
          setErrors('Unable to upload goals and questions to the database')
        }
        return
      }

    } catch (err) {
      setErrors(err.message);
      if ( development ) {
        console.log(err.message)
      }
    } finally {
      setLoading(false);
    }

  }


  return (
    <div className = "flex-container-col">
      <div className="flex-top-bar">
        <div className="flex-bar-left">
          <button className="global-button global-trans-button" onClick={() => handleBackClick()}> BACK </button>
        </div>
        <div className="flex-bar-middle">
        </div>
        <div className="flex-bar-right">
        </div>
      </div>
      <div className = "flex-content">
        { pageRendering &&
          <Spinner /> 
        }
        { !pageRendering &&
        <>
          <div>
            Generate Goals and questions by clicking the button below
          </div>
          { loading && <Spinner />}
          { !loading &&
            <button onClick={() => handleGenerateClick()} className = "global-button"> GENERATE </button>
          }
        </>
        }
      </div>
    </div>
  )
}

export default AdminAddQuestions