import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

import { DisplayQuestions } from 'admin';
import { Spinner } from 'components';

import "styles/admin/components/moduledisplay.css"




const ModuleDisplay = ({sectionData, sectionSelected, sectionLoading}) => {

  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const handleContentClick = () => {
    setShowContent(true);
    setShowSummary(false);
    setShowGoals(false);
    setShowQuestions(false);
  }
  const handleSummaryClick = () => {
    console.log(sectionData.goals)
    setShowContent(false);
    setShowSummary(true);
    setShowGoals(false);
    setShowQuestions(false);
  }
  const handleGoalsClick = () => {
    setShowContent(false);
    setShowSummary(false);
    setShowGoals(true);
    setShowQuestions(false);
  }
  const handleQuestionsClick = () => {
    setShowContent(false);
    setShowSummary(false);
    setShowGoals(false);
    setShowQuestions(true);
  }

  const handleAddGoalsClick = (section_id) => { navigate(`add-goals-and-questions/${section_id}`) }

  const handleAddContentClick = (section_id) => { navigate(`add-content/${section_id}`) }

  const handleAddSummaryClick = (section_id) => { navigate(`add-summary/${section_id}`) }

  const handleAddQuestionsClick = (section_id) => { navigate(`add-questions/${section_id}`) }


  return (
  <>
    { !sectionSelected && <h1 className = "flex-container">Please Select a Section</h1>}
    { sectionSelected && sectionLoading && <h1 className = "flex-container"><Spinner/></h1> }
    { sectionSelected && ! sectionLoading &&
      <>
        <div className = "section-name-title"> { sectionData.section_name } ({sectionData._id})</div>
        <div className = "right-page-top-bar">
          <button onClick={() => handleContentClick()} className = "global-button top-button">
            Content
          </button>
          <button onClick={() => handleSummaryClick()} className = "global-button top-button">
            Summary
          </button>
          <button onClick={() => handleGoalsClick()} className = "global-button top-button">
            Goals
          </button>
          <button onClick={() => handleQuestionsClick()} className = "global-button top-button">
            Questions
          </button>
        </div>
        <div className="right-page-content mgg">
          { showContent &&
          <>
            { !sectionData.full_content &&
            <>
              <div> Add Section Content here </div>
              <button onClick={() => handleAddContentClick(sectionData._id)} className="global-button"> ADD CONTENT </button>
            </>
            }
            { sectionData.full_content &&
              <div className ="markdown-content"> { sectionData.full_content } </div>
            }
          </>
          }
          { showSummary &&
          <>
            { !sectionData.summary &&
            <>
              { sectionData.goals && Object.keys(sectionData.goals).length > 0 &&
              <>
              <div> Add Section Summary here </div>
              <button onClick = {() => handleAddSummaryClick(sectionData._id)} className="global-button"> ADD SUMMARY </button>
              </>
              }
              { ( !sectionData.goals || Object.keys(sectionData.goals).length === 0)  &&
                <div> You must generate Goals before you generate a summary </div>
              }
            </>
            }
            { sectionData.summary &&
              <div className ="markdown-content"> { sectionData.summary } </div>
            }
          </>
          }
          { showGoals && 
            <>
              {  ( !sectionData.goals || Object.keys(sectionData.goals).length === 0 ) &&
                <>
                <div>No Goals or Questions - Add Goals First</div>
                <button onClick={() => handleAddGoalsClick(sectionData._id)} className="global-button">Add Goals and Questions</button>
                
                </>
              }
              {
                sectionData.goals && Object.keys(sectionData.goals).length > 0 &&
                <div> There are goals generated for this section. Goals will be displayed here. Feature not added yet. </div>
              }
            </>
          }
          { showQuestions && 
            <>
              {(!sectionData.goals || Object.keys(sectionData.goals).length === 0) ? (
                <>
                  <div> No Questions - Add here</div>
                  <button onClick={() => handleAddQuestionsClick(sectionData._id)} className = "global-button"> Add Questions </button>
                </>
              ) : (
                <>
                    <DisplayQuestions SectionData = { sectionData } />
                </>
              )}
            </>
          }
        </div>
      </>
    }
  </>
  )
}

export default ModuleDisplay