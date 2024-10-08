import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// API imports
import QuestionGenerationAPI from "api_link/question_generation.js"
import QuestionAPI from "api_link/questions.js"

// Component imports
import { Spinner } from 'components';

// Hook imports
import useLogContext from "hooks/useLogContext";
import useAdminNavbar from "hooks/useAdminNavbar";


const AdminAddQuestions = () => {

  const [pageRendering, setPageRendering] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const development = useLogContext();
  const navigate = useNavigate();

  const { creator_id, module_id, section_id } = useParams();

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    setLeftName('Module Overview');
    setLeftAction(() => () => navigate(`/admin/module/${creator_id}/${module_id}`));
    setTitleName('Generate Questions');
    setRightName('');
    setRightAction(null);
  }, [])

  const handleGenerateClick = async () => {

    setLoading(true);

    try {
      const res = await QuestionGenerationAPI.generateQuestionsForSection(section_id)

      if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)

        if ( development ) {
         console.log(res.data.detail)
         setErrors(res.data.detail)
        } else {
          setErrors('An error occurred when generating questions')
        }
        return
      }

      navigate(`/admin/module/${creator_id}/${module_id}`)

      const content = res.data
      if ( development ) {
        console.log(content.detail)
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
      <div className = "flex-content">
        { pageRendering &&
          <Spinner /> 
        }
        { !pageRendering &&
        <>
          <div>
            Generate Questions by clicking the button below
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