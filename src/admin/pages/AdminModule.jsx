// React / React Library imports
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ArrowDown, ArrowRight } from 'lucide-react';
//import ReactMarkdown from 'react-markdown';

// API imports
import modulesAPI from 'api_link/modules.js';

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Component imports
import { Spinner } from 'components';

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

  const [sectionSelected, setSectionSelected] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);

  const [collapsedParts, setCollapsedParts] = useState({});
  const [collapsedChapters, setCollapsedChapters] = useState({});

  const [showContent, setShowContent] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const toggleCollapse = (stateUpdater, id) => {
    stateUpdater(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
    setLeftName('All Modules');
    setLeftAction(() => () => navigate(`/admin/all-modules/${creator_id}`));
    setTitleName(currentModuleData.module_name);
    setRightName('Delete Module');
    setRightAction(() => () => navigate('delete'));
  }, [currentModuleData])
  

  const handleBuildOutClick = () => {
    navigate(`/admin/build-out-module/${creator_id}/${module_id}`)
  }

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
        setSectionData(prevData => [...prevData, content.data]);
        setCurrentSectionData(content.data)
        
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

  const handleAddQuestionsClick = (section_id) => {
    navigate(`add-questions/${section_id}`)
  }

  const handleAddContentClick = (section_id) => {
    navigate(`add-content/${section_id}`)
  }

  const handleAddSummaryClick = (section_id) => {
    navigate(`add-summary/${section_id}`)
  }

  return (
    <div className = "flex-container-col">
        { pageRendering &&
          <Spinner /> 
        }
        { !pageRendering && ( !currentModuleData.parts || Object.keys(currentModuleData.parts).length === 0)  && 
            <div className = "flex-no-module-container">
              <div className = "no-module-box">
                {/* 
                Add Module Manually. You must already have your content broken down into sections.
                <button className="global-button" onClick={() => handleAddPartClick()}> ADD PART </button>
                */}
              </div>
              <div className = "no-module-box">
                <div className = "no-module-title">
                  Build out Module Automatically up uploading a PDF.
                </div>
                <button onClick={() => handleBuildOutClick()} className="global-button">BUILD OUT MODULE</button>
              </div>
            </div>
        }
        {!pageRendering && currentModuleData.parts && Object.keys(currentModuleData.parts).length > 0 && (
          <div className = "flex-main-page">
            <div className = "flex-left-page">
              {Object.values(currentModuleData.parts).map(part => (
                <div key={part._id}>
                  <div className="part-header">
                    <div className = "collapse-button">
                      <button onClick={() => toggleCollapse(setCollapsedParts, part._id)} className="global-button global-trans-button white-button">
                        {collapsedParts[part._id] ? <ArrowRight /> : <ArrowDown />}
                      </button>
                    </div>
                    <h3>{part.part_name}</h3>
                  </div>
                  {!collapsedParts[part._id] && Object.values(part.chapters).map(chapter => (
                    <div key={chapter._id} className="chapter-container">
                      <div className="chapter-header">
                        <div className = "collapse-button">
                          <button onClick={() => toggleCollapse(setCollapsedChapters, chapter._id)} className="global-button global-trans-button white-button">
                            {collapsedChapters[chapter._id] ? <ArrowRight /> : <ArrowDown />}
                          </button>
                        </div>
                        <h4>{chapter.chapter_name}</h4>
                      </div>
                      {!collapsedChapters[chapter._id] && Object.values(chapter.sections).map(section => (
                        <div key={section._id} className="section-container">
                          <div className="section-header">
                            <button onClick={() => handleSectionSelection(section._id)} className="global-button global-trans-button white-button">
                              <h5>{section.section_name}</h5>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
                  { showGoals && 
                    <>
                      {  ( !currentSectionData.goals || Object.keys(currentSectionData.goals).length === 0 ) &&
                        <>
                        <div> No Goals - Add here</div>
                        <button onClick={() => handleAddQuestionsClick(currentSectionData._id)} className = "global-button"> Add Questions </button>
                        </>
                      }
                      {
                        currentSectionData.goals && Object.keys(currentSectionData.goals).length > 0 &&
                        <div> There are goals generated for this section. Goals will be displayed here. Feature not added yet. </div>
                      }
                    </>
                  }
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