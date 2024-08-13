// React / React Library imports
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft, Pencil } from "lucide-react"
//import ReactMarkdown from 'react-markdown';

// API imports
import modulesAPI from 'api_link/modules.js';

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Component imports
import { Spinner, ModuleDisplay } from 'components';


// Context imports
import useModuleContext from 'hooks/useModuleContext';
import useSectionContext from 'hooks/useSectionContext';
import useLogContext from 'hooks/useLogContext';

// Styling
import "styles/admin/adminmodule.css"

const AdminModule = () => {

  const [pageRendering, setPageRendering] = useState(false);
  const [errors, setErrors] = useState(null);

  const { creator_id, module_id } = useParams();
  const navigate = useNavigate();
  const { development } = useLogContext();

  const { moduleData, setModuleData } = useModuleContext();
  const [currentModuleData, setCurrentModuleData] = useState([]);

  const { sectionData, setSectionData } = useSectionContext();
  const [currentSectionData, setCurrentSectionData] = useState([]);
  const [sectionErrors, setSectionErrors] = useState(null);

  const [displayModuleList, setDisplayModuleList] = useState(true);
  const [edittingModule, setEdittingModule] = useState(false);

  const [sectionSelected, setSectionSelected] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);

  const [showContent, setShowContent] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await modulesAPI.getModuleFullDetail(module_id)

        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          if ( development ) {
            setErrors(res.data.detail)
          } else {
            setErrors('Module Not Found')
          }
          return
        }

        const content = res.data
        setModuleData(prevData => [...prevData, content.data]);
        setCurrentModuleData(content.data)
        
        if ( development ) {
          console.log(content.detail)
        }

      } catch (err) {
        setErrors(err.message);
        if ( development ) {
          console.log(err.message)
        }
      } finally {
        setPageRendering(false);
      }
    };
    
    let currentModuleIndex = moduleData.findIndex(module => module._id === module_id)
    if ( currentModuleIndex === -1 ) {
      setPageRendering(true);
      fetchData();
    } else {
      setCurrentModuleData(moduleData[currentModuleIndex])
    }

  }, [])

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    console.log('Current section Data:', currentSectionData)
    setLeftName('All Modules');
    setLeftAction(() => () => navigate(`/admin/all-modules/${creator_id}`));
    setTitleName(currentModuleData.module_name);
    setRightName('Delete Module');
    setRightAction(() => () => navigate('delete'));
  }, [currentModuleData])
  
  const handleAddPartClick = () => {
    navigate(`/admin/add-module-part/${creator_id}/${module_id}`)
  }
  const handleBuildOutClick = () => {
    navigate(`/admin/build-out-module/${creator_id}/${module_id}`)
  }

  const toggleModuleListDisplay = () => { setDisplayModuleList(!displayModuleList) }
  const toggleModuleEdit = () => { setEdittingModule(!edittingModule) }

  const handleSectionSelection = (section_id) => {

    setSectionSelected(true);
    setSectionLoading(true);

    const fetchSectionData = async () => {
      try {
        const res = await modulesAPI.getSectionFullDetail(section_id)

        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          if ( development ) {
            setSectionErrors(res.data.detail)
          } else {
            setSectionErrors('Section Not Found')
          }
          return
        }

        const content = res.data
        setSectionData(prevData => [...prevData, content]);
        setCurrentSectionData(content)
        
        if ( development ) {
          console.log(content.detail)
        }

      } catch (err) {
        setSectionErrors(err.message);
        if ( development ) {
          console.log(err.message)
        }
      } finally {
        setSectionLoading(false);
      }
    };

    let currentSectionIndex = sectionData.findIndex(section => section._id === section_id)
    if ( currentSectionIndex === -1 ) {
      fetchSectionData();
    } else {
      setCurrentSectionData(sectionData[currentSectionIndex])
      setSectionLoading(false);
    } 
    
  }

  const handleContentClick = () => {
    console.log(moduleData)
    setShowContent(true);
    setShowSummary(false);
    setShowGoals(false);
    setShowQuestions(false);
  }
  const handleSummaryClick = () => {
    console.log(currentSectionData.goals)
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
  const handleQuestionstClick = () => {
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
    <div className = "flex-container-col">
        { pageRendering &&
          <Spinner /> 
        }
        { !pageRendering && ( !currentModuleData.parts || Object.keys(currentModuleData.parts).length === 0)  && 
            <div className = "flex-no-module-container">
              <div className = "no-module-box">
                <h1 style ={{ paddingBottom : "40px"}}> Option 1 - Add Module Manually</h1>
                Add Module Manually. You must already have your content broken down into sections.
                <div style ={{ paddingTop : "40px"}}>
                  <button onClick={() => handleAddPartClick()} className="global-button global-form-submit-button"> ADD MANUALLY </button>
                </div>
              </div>
              <div className = "no-module-box">
                <div className = "no-module-title">
                <h1 style ={{ paddingBottom : "40px"}}> Option 2 - Auto Generate Module</h1>
                  Build out Module Automatically up uploading a PDF.
                </div>
                <div style ={{ paddingTop : "40px"}}>
                  <button onClick={() => handleBuildOutClick()} className="global-button global-form-submit-button">BUILD OUT MODULE</button>
                </div>
              </div>
            </div>
        }
        {!pageRendering && currentModuleData.parts && Object.keys(currentModuleData.parts).length > 0 && (
          <div className = "flex-main-page">
            { !displayModuleList &&  <div className = "flex-left-page-minimised">
              <button onClick={toggleModuleListDisplay} className="global-button global-trans-button button-size-minimised"><ChevronRight /></button>
            </div> }
            { displayModuleList  && 
            <div className = "flex-left-page mbg">
              <div className = "flex-left-page-top-bar">
                <div className="flex-left-page-top-bar-menu-button"><button onClick={toggleModuleListDisplay} className="global-button global-trans-button button-size"><ChevronLeft /></button></div>
                <div className="flex-left-page-top-bar-edit-button"><button onClick={toggleModuleEdit} className="global-button global-trans-button button-size"><Pencil /></button></div>
              </div>
              < ModuleDisplay handleSectionSelection = { handleSectionSelection } currentModuleData = { currentModuleData } edittingModule = { edittingModule } />
            </div>
            }
            <div className = "flex-right-page">
              { !sectionSelected && <h1 className = "flex-container">Please Select a Section</h1>}
              { sectionSelected && sectionLoading && <h1 className = "flex-container"><Spinner/></h1> }
              { sectionSelected && ! sectionLoading &&
              <>
                <div> { currentSectionData.section_name } </div>
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
                  <button onClick={() => handleQuestionstClick()} className = "global-button top-button">
                    Questions
                  </button>
                </div>
                <div className="right-page-content">
                  { showContent &&
                  <>
                    { !currentSectionData.full_content &&
                    <>
                      <div> Add Section Content here </div>
                      <button onClick={() => handleAddContentClick(currentSectionData._id)} className="global-button"> ADD CONTENT </button>
                    </>
                    }
                    { currentSectionData.full_content &&
                      <div className ="markdown-content"> { currentSectionData.full_content } </div>
                    }
                  </>
                  }
                  { showSummary &&
                  <>
                    { !currentSectionData.summary &&
                    <>
                      { currentSectionData.goals && Object.keys(currentSectionData.goals).length > 0 &&
                      <>
                      <div> Add Section Summary here </div>
                      <button onClick = {() => handleAddSummaryClick(currentSectionData._id)} className="global-button"> ADD SUMMARY </button>
                      </>
                      }
                      { ( !currentSectionData.goals || Object.keys(currentSectionData.goals).length === 0)  &&
                        <div> You must generate Goals before you generate a summary </div>
                      }
                    </>
                    }
                    { currentSectionData.summary &&
                      <div className ="markdown-content"> { currentSectionData.summary } </div>
                    }
                  </>
                  }
                  { showGoals && 
                    <>
                      {  ( !currentSectionData.goals || Object.keys(currentSectionData.goals).length === 0 ) &&
                        <>
                        <div>No Goals or Questions - Add Goals First</div>
                        <button onClick={() => handleAddGoalsClick(currentSectionData._id)} className="global-button">Add Goals and Questions</button>
                        
                        </>
                      }
                      {
                        currentSectionData.goals && Object.keys(currentSectionData.goals).length > 0 &&
                        <div> There are goals generated for this section. Goals will be displayed here. Feature not added yet. </div>
                      }
                    </>
                  }
                  { showQuestions && 
                    <>
                      {(!currentSectionData.goals || Object.keys(currentSectionData.goals).length === 0) ? (
                        <>
                          <div> No Questions - Add here</div>
                          <button onClick={() => handleAddQuestionsClick(currentSectionData._id)} className = "global-button"> Add Questions </button>
                        </>
                      ) : (
                        <>
                          {Object.values(currentSectionData.goals).some(goal => goal.questions && goal.questions.length > 0) ? (
                            <>
                              <div>There are questions generated for this section. Questions will be displayed here. Feature not added yet.</div>
                            </>
                          ) : (
                            <>
                              <div>No questions available for any goals in this section.</div>
                              <button onClick={() => handleAddQuestionsClick(currentSectionData._id)} className="global-button">Add Questions</button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  }
                </div>
              </>
              }
            </div>
          </div>
        )}
      </div>
  )
};

export default AdminModule;


// {/* You can add more detailed display of questions here if needed */}
// {Object.entries(currentSectionData.goals).map(([goalId, goal]) => (
//   goal.questions && goal.questions.length > 0 && (
//     <div key={goalId}>
//       <h4>{goal.summary}</h4>
//       <p>Number of questions: {goal.questions.length}</p>
//       <button onClick={() => handleViewQuestionsClick(goalId)} className="global-button">View/Edit Questions</button>
//     </div>
//   )
// ))}