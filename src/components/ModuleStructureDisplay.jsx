import { useState, useEffect, useRef } from "react";
import useLogContext from "hooks/useLogContext";
import { ArrowDown, ArrowRight, Trash2 } from "lucide-react";
import "styles/components/modulestructuredisplay.css";

import modulesAPILink from "api_link/modules";

const ModuleStructureDisplay = ({ handleSectionSelection, currentModuleData, setCurrentModuleData, edittingModule }) => {

  const { development } = useLogContext();

  // Collapse Stuff
  const [collapsedParts, setCollapsedParts] = useState({});
  const [collapsedChapters, setCollapsedChapters] = useState({});

  const toggleCollapse = (stateUpdater, id) => {
    stateUpdater((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  // Pop up

  const [addSectionPopUp, setAddSectionPopUp] = useState({});
  const [addSectionLoading, setAddSectionLoading] = useState(false);
  const [sectionErrors, setSectionErrors] = useState('');
  const [inputText, setInputText] = useState('');
  const sectionPopupRef = useRef(null);

  const [addChapterPopUp, setAddChapterPopUp] = useState({});
  const [addChapterLoading, setAddChapterLoading] = useState(false);
  const [chapterErrors, setChapterErrors] = useState('');
  const chapterPopupRef = useRef(null);

  const [addPartPopUp, setAddPartPopUp] = useState(false);
  const [addPartLoading, setAddPartLoading] = useState(false);
  const [partErrors, setPartErrors] = useState('');
  const partPopupRef = useRef(null);

  useEffect(() => {
    console.log(currentModuleData)
    const handleClickOutside = (event) => {
      if (sectionPopupRef.current && !sectionPopupRef.current.contains(event.target)) {
        setAddSectionPopUp({});
        setSectionErrors('');
      }
      if (chapterPopupRef.current && !chapterPopupRef.current.contains(event.target)) {
        setAddChapterPopUp({});
        setChapterErrors('');
      }
      if (partPopupRef.current && !partPopupRef.current.contains(event.target)) {
        setAddPartPopUp(false);
        setPartErrors('');
      }
      if (deletePartPopupRef.current && !deletePartPopupRef.current.contains(event.target)) {
        setDeletePartPopUp({});
        setPartDeletionErrors('');
      }
      if (deleteChapterPopupRef.current && !deleteChapterPopupRef.current.contains(event.target)) {
        setDeleteChapterPopUp({});
        setChapterDeletionErrors('');
      }
      if (deleteSectionPopupRef.current && !deleteSectionPopupRef.current.contains(event.target)) {
        setDeleteSectionPopUp({});
        setSectionDeletionErrors('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddSectionClick = (chapterId) => {
    setAddSectionPopUp((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handleAddChapterClick = (partId) => {
    setAddChapterPopUp((prev) => ({ ...prev, [partId]: !prev[partId] }));
  };

  const handleAddPartClick = () => {
    setAddPartPopUp(!addPartPopUp);
  };

  const handleConfirmSection = async (chapter_id) => {
    if (inputText.length === 0) { return }
    setAddSectionLoading(true)

    try {
      const body = {
        section_name: inputText
      }
      const res = await modulesAPILink.addSection(chapter_id, body)

      if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
        if (development) {
          setSectionErrors(res.data.detail)
        } else {
          setSectionErrors('Section Not Created')
        }
        return
      }

      if (development) {
        console.log(res.data)
      }

      setInputText('')
      setAddSectionPopUp((prev) => ({ ...prev, [chapter_id]: false }))

      // Update state
      setCurrentModuleData(prevData => {
        const updatedData = { ...prevData };
        const newSection = res.data;
        Object.values(updatedData.parts).forEach(part => {
          Object.values(part.chapters).forEach(chapter => {
            if (chapter._id === chapter_id) {
              chapter.sections[newSection._id] = newSection;
            }
          });
        });
        return updatedData;
      });

    } catch (err) {
      if (development) {
        console.log(err)
        setSectionErrors(err.message)
      } else {
        setSectionErrors('There was an unexpected error adding the section')
      }

    } finally {
      setAddSectionLoading(false)
    }
  }

  const handleConfirmChapter = async (part_id) => {
    if (inputText.length === 0) { return }
    setAddChapterLoading(true)

    try {
      const body = {
        chapter_name: inputText
      }
      const res = await modulesAPILink.addChapter(part_id, body)

      if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
        if (development) {
          setChapterErrors(res.data.detail)
        } else {
          setChapterErrors('Chapter Not Created')
        }
        return
      }

      if (development) {
        console.log(res.data)
      }

      setInputText('')
      setAddChapterPopUp((prev) => ({ ...prev, [part_id]: false }))

    } catch (err) {
      if (development) {
        console.log(err)
        setChapterErrors(err.message)
      } else {
        setChapterErrors('There was an unexpected error adding the chapter')
      }

    } finally {
      setAddChapterLoading(false)
    }
  }

  const handleConfirmPart = async (module_id) => {
    if (inputText.length === 0) { return }
    setAddPartLoading(true)

    try {
      const body = {
        part_name: inputText
      }
      const res = await modulesAPILink.addPart(module_id, body)

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          console.log(res.data.detail)
          setPartErrors(res.data.detail)
        } else {
          setPartErrors('Part Not Created')
        }
        return
      }

      if (development) {
        console.log(res.data)
      }

      setInputText('')
      setAddPartPopUp(false)

    } catch (err) {
      if (development) {
        console.log(err)
        setPartErrors(err.message)
      } else {
        setPartErrors('There was an unexpected error adding the part')
      }

    } finally {
      setAddPartLoading(false)
    }
  }

  const [partDeletionErrors, setPartDeletionErrors] = useState(null);
  const [partDeletionLoading, setPartDeletionLoading] = useState(false);
  const [deletePartPopUp, setDeletePartPopUp] = useState({});
  const deletePartPopupRef = useRef(null);

  const handleDeletePartClick = (part_id) => {
    setDeletePartPopUp((prev) => ({ ...prev, [part_id]: !prev[part_id] }));
  };

  const handleDeletePartConfirm = async (part_id) => {
    setPartDeletionLoading(true)
    try {
      const res = await modulesAPILink.deletePartSafely(part_id)

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          console.log(res.data)
          console.log(res.data.detail)
          setPartDeletionErrors(res.data.detail)
        } else {
          setPartDeletionErrors('Part Not Deleted')
        }
        return
      }

      if (development) {
        console.log(res.data)
      }

      setDeletePartPopUp((prev) => ({ ...prev, [part_id]: true }))

    } catch (err) {
      if (development) {
        console.log(err)
        setPartDeletionErrors(err.message)
      } else {
        setPartDeletionErrors('There was an unexpected error deleting the part')
      }
    } finally {
      setPartDeletionLoading(false)
    }
  }

  const [chapterDeletionErrors, setChapterDeletionErrors] = useState(null);
  const [chapterDeletionLoading, setChapterDeletionLoading] = useState(false);
  const [deleteChapterPopUp, setDeleteChapterPopUp] = useState({});
  const deleteChapterPopupRef = useRef(null);

  const handleDeleteChapterClick = (chapter_id) => {
    setDeleteChapterPopUp((prev) => ({ ...prev, [chapter_id]: !prev[chapter_id] }));
  };

  const handleDeleteChapterConfirm = async (chapter_id) => {
    setChapterDeletionLoading(true)
    try {
      const res = await modulesAPILink.deleteChapterSafely(chapter_id)

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          console.log(res.data)
          console.log(res.data.detail)
          setChapterDeletionErrors(res.data.detail)
        } else {
          setChapterDeletionErrors('Chapter Not Deleted')
        }
        return
      }

      if (development) {
        console.log(res.data)
      }

      setDeleteChapterPopUp((prev) => ({ ...prev, [chapter_id]: true }))

    } catch (err) {
      if (development) {
        console.log(err)
        setChapterDeletionErrors(err.message)
      } else {
        setChapterDeletionErrors('There was an unexpected error deleting the chapter')
      }
    } finally {
      setChapterDeletionLoading(false)
    }
  }

  const [sectionDeletionErrors, setSectionDeletionErrors] = useState(null);
  const [sectionDeletionLoading, setSectionDeletionLoading] = useState(false);
  const [deleteSectionPopUp, setDeleteSectionPopUp] = useState({});
  const deleteSectionPopupRef = useRef(null);

  const handleDeleteSectionClick = (section_id) => {
    setDeleteSectionPopUp((prev) => ({ ...prev, [section_id]: !prev[section_id] }));
  };

  const handleDeleteSectionConfirm = async (section_id) => {
    setSectionDeletionLoading(true)
    try {
      const res = await modulesAPILink.deleteSectionSafely(section_id)

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          console.log(res.data)
          console.log(res.data.detail)
          setSectionDeletionErrors(res.data.detail)
        } else {
          setSectionDeletionErrors('Section Not Deleted')
        }
        return
      }

      if (development) {
        console.log(res.data)
      }

      setDeleteSectionPopUp((prev) => ({ ...prev, [section_id]: true }))

    } catch (err) {
      if (development) {
        console.log(err)
        setSectionDeletionErrors(err.message)
      } else {
        setSectionDeletionErrors('There was an unexpected error deleting the section')
      }
    } finally {
      setSectionDeletionLoading(false)
    }
  }



  return (
    <>
      {edittingModule && (
        <>
          <button className="global-button global-trans-button add-part-header">
            <h3 onClick={handleAddPartClick} className="part-header">Add Part</h3>
          </button>
          {addPartPopUp && (
            <div ref={partPopupRef} className="custom-popup">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter part name..."
              />
              {addPartLoading ? (<p>Loading...</p>) : (
                <div className="popup-buttons">
                  <button onClick={() => handleConfirmPart(currentModuleData._id)}>Add Part</button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {Object.values(currentModuleData.parts).map((part) => (
        <div key={part._id}>
          <div className="part-header">
            <div className="collapse-button">
              <button onClick={() => toggleCollapse(setCollapsedParts, part._id)} className="global-button global-trans-button white-button">
                {collapsedParts[part._id] ? <ArrowRight /> : <ArrowDown />}
              </button>
            </div>
            <h3 className="header-text">{part.part_name} - {part._id}</h3>
            {edittingModule && (
              <>
                <button onClick={() => handleDeletePartClick(part._id)} className="global-button global-trans-button bin-icon"><Trash2 /></button>
                {deletePartPopUp[part._id] && (
                  <div ref={deletePartPopupRef} className="custom-popup">
                    <p style={{ color: 'black' }}>Are you sure you want to delete this part?</p>
                    {partDeletionErrors && <p style={{ color: 'red' }}>{partDeletionErrors}</p>}
                    <div className="popup-buttons">
                      <button onClick={() => handleDeletePartConfirm(part._id)}>DELETE</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {edittingModule && (
            <>
              <button className="global-button global-trans-button add-chapter-header">
                <h4 onClick={() => handleAddChapterClick(part._id)} className="chapter-header">Add Chapter</h4>
              </button>
              {addChapterPopUp[part._id] && (
                <div ref={chapterPopupRef} className="custom-popup">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter chapter name..."
                  />
                  {addChapterLoading ? (<p>Loading...</p>) : (
                    <div className="popup-buttons">
                      <button onClick={() => handleConfirmChapter(part._id)}>Add Chapter</button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {!collapsedParts[part._id] &&
            Object.values(part.chapters).map((chapter) => (
              <div key={chapter._id} className="chapter-container">
                <div className="chapter-header">
                  <div className="collapse-button">
                    <button onClick={() => toggleCollapse(setCollapsedChapters, chapter._id)} className="global-button global-trans-button white-button">
                      {collapsedChapters[chapter._id] ? <ArrowRight className="white-button" /> : <ArrowDown className="white-button" />}
                    </button>
                  </div>
                  <h4 className="header-text">{chapter.chapter_name} - {chapter._id}</h4>
                  {edittingModule && (
                    <>
                      <button onClick={() => handleDeleteChapterClick(chapter._id)} className="global-button global-trans-button bin-icon"><Trash2 /></button>
                      {deleteChapterPopUp[chapter._id] && (
                        <div ref={deleteChapterPopupRef} className="custom-popup">
                          <p style={{ color: 'black' }}>Are you sure you want to delete this chapter?</p>
                          {chapterDeletionErrors && <p style={{ color: 'red' }}>{chapterDeletionErrors}</p>}
                          <div className="popup-buttons">
                            <button onClick={() => handleDeleteChapterConfirm(chapter._id)}>DELETE</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {edittingModule && (
                  <>
                    <button onClick={() => handleAddSectionClick(chapter._id)} className="global-button global-trans-button add-section-header">
                      <h5 className="section-header">Add Section</h5>
                    </button>
                    {addSectionPopUp[chapter._id] && (
                      <div ref={sectionPopupRef} className="custom-popup">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="Enter text..."
                        />
                        {addSectionLoading ? (<p>Loading...</p>) : (
                          <div className="popup-buttons">
                            <button onClick={() => handleConfirmSection(chapter._id)}>Confirm</button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                {!collapsedChapters[chapter._id] &&
                  Object.values(chapter.sections).map((section) => (
                    <div key={section._id} className="section-container">
                      <div className="section-header">
                        <button onClick={() => handleSectionSelection(section._id)} className="global-button global-trans-button white-button">
                          <h5 className="header-text">{section.section_name}</h5>
                        </button>
                        {edittingModule && (
                          <>
                            <button onClick={() => handleDeleteSectionClick(section._id)} className="global-button global-trans-button bin-icon"><Trash2 /></button>
                            {deleteSectionPopUp[section._id] && (
                              <div ref={deleteSectionPopupRef} className="custom-popup">
                                <p style={{ color: 'black' }}>Are you sure you want to delete this section?</p>
                                {sectionDeletionErrors && <p style={{ color: 'red' }}>{sectionDeletionErrors}</p>}
                                <div className="popup-buttons">
                                  <button onClick={() => handleDeleteSectionConfirm(section._id)}>DELETE</button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default ModuleStructureDisplay;
