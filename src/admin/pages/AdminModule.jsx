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
import { Spinner, ModuleStructureDisplay } from 'components';
import { ModuleDisplay } from 'admin';

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

  // Fetch Module Data and append it to the moduleData array from the useModuleContext
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await modulesAPI.getModuleFullDetail(module_id)

        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          if (development) {
            setErrors(res.data.detail)
          } else {
            setErrors('Module Not Found')
          }
          return
        }

        const content = res.data
        setModuleData(prevData => [...prevData, content.data]);
        setCurrentModuleData(content.data)

        if (development) {
          console.log(content.detail)
        }

      } catch (err) {
        setErrors(err.message);
        if (development) {
          console.log(err.message)
        }
      } finally {
        setPageRendering(false);
      }
    };

    let currentModuleIndex = moduleData.findIndex(module => module._id === module_id)
    if (currentModuleIndex === -1) {
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

  // Handles when a section is selected
  const handleSectionSelection = (section_id) => {

    setSectionSelected(true);
    setSectionLoading(true);

    // Fetch Section Data and append it to the sectionData array from the useSectionContext
    const fetchSectionData = async () => {
      try {
        const res = await modulesAPI.getSectionFullDetail(section_id)

        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          if (development) {
            setSectionErrors(res.data.detail)
          } else {
            setSectionErrors('Section Not Found')
          }
          return
        }

        const content = res.data
        setSectionData(prevData => [...prevData, content]);
        setCurrentSectionData(content)

        if (development) {
          console.log(content.detail)
        }

      } catch (err) {
        setSectionErrors(err.message);
        if (development) {
          console.log(err.message)
        }
      } finally {
        setSectionLoading(false);
      }
    };

    // Check if we alraedy have fetched this sections data, if not trigger fetch function above
    let currentSectionIndex = sectionData.findIndex(section => section._id === section_id)
    if (currentSectionIndex === -1) {
      fetchSectionData();
    } else {
      setCurrentSectionData(sectionData[currentSectionIndex])
      setSectionLoading(false);
    }
    console.log(currentSectionData)

  }



  return (
    <div className="flex-container-col-no-scroll">
      {pageRendering &&
        <Spinner />
      }
      {!pageRendering && (!currentModuleData.parts || Object.keys(currentModuleData.parts).length === 0) &&
        <div className="flex-no-module-container">
          <div className="no-module-box">
            <h1 style={{ paddingBottom: "40px" }}> Option 1 - Add Module Manually</h1>
            Add Module Manually. You must already have your content broken down into sections.
            <div style={{ paddingTop: "40px" }}>
              <button onClick={() => handleAddPartClick()} className="global-button global-form-submit-button"> ADD MANUALLY </button>
            </div>
          </div>
          <div className="no-module-box">
            <div className="no-module-title">
              <h1 style={{ paddingBottom: "40px" }}> Option 2 - Auto Generate Module</h1>
              Build out Module Automatically up uploading a PDF.
            </div>
            <div style={{ paddingTop: "40px" }}>
              <button onClick={() => handleBuildOutClick()} className="global-button global-form-submit-button">BUILD OUT MODULE</button>
            </div>
          </div>
        </div>
      }
      {!pageRendering && currentModuleData.parts && Object.keys(currentModuleData.parts).length > 0 && (
        <div className="flex-main-page">
          {!displayModuleList && <div className="flex-left-page-minimised">
            <button onClick={toggleModuleListDisplay} className="global-button global-trans-button button-size-minimised"><ChevronRight /></button>
          </div>}
          {displayModuleList &&
            <div className="flex-left-page">
              <div className="flex-left-page-top-bar">
                <div className="flex-left-page-top-bar-menu-button"><button onClick={toggleModuleListDisplay} className="global-button global-trans-button button-size"><ChevronLeft /></button></div>
                <div className="flex-left-page-top-bar-edit-button"><button onClick={toggleModuleEdit} className="global-button global-trans-button button-size"><Pencil /></button></div>
              </div>
              < ModuleStructureDisplay handleSectionSelection={handleSectionSelection} currentModuleData={currentModuleData} setCurrentModuleData={setCurrentModuleData} edittingModule={edittingModule} />
            </div>
          }
          <div className="flex-right-page">
            < ModuleDisplay sectionData={currentSectionData} sectionSelected={sectionSelected} sectionLoading={sectionLoading} />
          </div>
        </div>
      )}
    </div>
  )
};

export default AdminModule;


