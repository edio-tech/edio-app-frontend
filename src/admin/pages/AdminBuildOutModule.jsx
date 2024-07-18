// React / React Library imports
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowDown, ArrowRight } from 'lucide-react';

// Context imports
import useLogContext from 'hooks/useLogContext';

// API imports
import moduleGenerationAPI from "api_link/module_generation.js"

// Styling
import "styles/admin/adminbuildoutmodule.css"



const AdminBuildOutModule = () => {

  const { creator_id, module_id } = useParams();
  const { development } = useLogContext();
  const navigate = useNavigate();

  // File uploading
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileErrors, setFileErrors] = useState(null);

  const [markdownContent, setMarkdownContent] = useState(null);
  const [jsonContent, setJsonContent] = useState(null);

  // Converting Markdown to JSON
  const [jsonErrors, SetJsonErrors] = useState();
  const [moduleCreationErrors, setModuleCreationErrors] = useState();

  // File Uploading
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Making JSON collapsible
  const [collapsedParts, setCollapsedParts] = useState({});
  const [collapsedChapters, setCollapsedChapters] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleCollapse = (stateUpdater, id) => {
    stateUpdater(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      console.log('You must upload a file!');
      setFileErrors('You must upload a file!')
      return
    }
    const formData = new FormData();
    formData.append('file', selectedFile)

    // Convert the PDf to markdown
    try {
      const res = await moduleGenerationAPI.bodyPdfToWordToMarkdown(module_id, formData)
      if (res.status < 200 || res.status >= 300) { 
        console.log(`An error occurred when converting the PDF to markdown. Status: ${res.status}`)
        throw new Error('Unable to convert the PDF to markdown');
      }
      setMarkdownContent(res.data)
    } catch (err) {
      setFileErrors(err);
      return
    }
  }

  const handleJsonConversionClick = async (number) => {

    try {
      const body = {"layer_number" : number}
      const res = await moduleGenerationAPI.bodyMarkdownToThreeLayers(module_id, body)
      
      if (res.status < 200 || res.status >= 300) { 
        const error_message = 'Failed to convert to JSON.'
        console.log(`${error_message} Status: ${res.status}`)
        throw new Error(error_message);
      }

      let content = res.data;
      setJsonContent(content);

    } catch (err) {
      SetJsonErrors(err);
      if (development) {
        console.log(err)
      }
    }
  };

  const handleCreateModuleClick = async () => {
    try {
      const res = await moduleGenerationAPI.bodyJsonToDatabase(module_id, jsonContent)

      if (res.status < 200 || res.status >= 300) { 
        const errorData = await res.json()
        const error_message = errorData.detail
        console.log(`${error_message} Status: ${res.status}`)
        throw new Error(error_message);
      }

      const content = res.data
      console.log(content.data)
      if ( development ) {
        console.log(content.detail)
      }
      navigate(`/admin/module/${creator_id}/${module_id}`)

    } catch (err) {
      setModuleCreationErrors(err);
      if (development) {
        console.log(err)
      }
    }
  };

  return (
    <div className = "flex-container-col mbg">
      <div className = "top-bar">
      { markdownContent &&
        <>
          <div className="button-div">
            <button onClick={() => {handleJsonConversionClick(1)}} className="global-button"> ONE LAYER </button>
          </div>
          <div className="button-div">
            <button onClick={() => {handleJsonConversionClick(2)}} className="global-button"> TWO LAYERS </button>
          </div>
          <div className="button-div">
            <button onClick={() => {handleJsonConversionClick(3)}} className="global-button"> THREE LAYERS </button>
          </div>
        </>
      }
        {
          jsonContent &&
            <div className="button-div">
              <button onClick={() => {handleCreateModuleClick()}} className="global-button"> CREATE </button>
            </div>
        } 
      </div>
      { markdownContent && !jsonContent &&
        <>
          <div className = "markdown-content">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </>
      }
      {
        jsonContent && markdownContent &&
        <>
          <div className = "flex-json-container">
          <div className="display-json mrg">
        {jsonContent.map((part, part_index) => (
          <div key={part_index}>
            <h1 className="segment-title cursor-pointer">
              <button onClick={() => toggleCollapse(setCollapsedParts, part_index)} className="global-button global-trans-button">
                {collapsedParts[part_index] && 
                  <ArrowDown />
                }
                {!collapsedParts[part_index] && 
                  <ArrowRight />
                }
              </button>
              {part['part_name']}
            </h1>
            {collapsedParts[part_index] && (
              <div className="segment-body">
                {part["chapters"].map((chapter, chapter_index) => (
                  <div key={chapter_index}>
                    <h2 className="segment-title cursor-pointer">
                    <button onClick={() => toggleCollapse(setCollapsedChapters, `${part_index}-${chapter_index}`)} className="global-button global-trans-button">
                      {collapsedChapters[`${part_index}-${chapter_index}`] &&
                        <ArrowDown />
                      }
                      {!collapsedChapters[`${part_index}-${chapter_index}`] &&
                        <ArrowRight />
                      }
                    </button>
                      {chapter['chapter_name']}
                    </h2>
                    {collapsedChapters[`${part_index}-${chapter_index}`] && (
                      <div className="segment-body">
                        {chapter["sections"].map((section, section_index) => (
                          <div key={section_index}>
                            <h4 className="segment-title cursor-pointer">
                              <button onClick={() => toggleCollapse(setCollapsedSections, `${part_index}-${chapter_index}-${section_index}`)} className="global-button global-trans-button">
                                {collapsedSections[`${part_index}-${chapter_index}-${section_index}`] &&
                                  <ArrowDown />
                                }
                                {!collapsedSections[`${part_index}-${chapter_index}-${section_index}`] &&
                                  <ArrowRight />
                                }
                              </button>
                            
                              {section['section_name']}
                            </h4>
                            {collapsedSections[`${part_index}-${chapter_index}-${section_index}`] && (
                              <div className="segment-body">
                                {section['content']}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
            <div className="display-markdown">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          </div>
        </>
      }
      { !markdownContent && 
        <form onSubmit = {handleSubmit}>
          <label htmlFor="file-upload"> Upload PDF File </label>
          <input type="file" id="file-upload" accept=".pdf" onChange={handleFileChange} />
          <button type="submit" className="global-button"> Upload File </button>
        </form>
      }
    </div>
  )
};

export default AdminBuildOutModule;