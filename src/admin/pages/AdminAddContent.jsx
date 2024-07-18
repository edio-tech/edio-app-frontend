import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import modulesAPI from "api_link/modules.js"
import moduleGenerationAPI from "api_link/module_generation.js"

import "styles/admin/adminaddcontent.css"

const AdminAddContent = () => {

   const { creator_id, module_id, section_id } = useParams();
   const navigate = useNavigate();

   const [markdownContent, setMarkdownContent] = useState();

   // File uploading
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileErrors, setFileErrors] = useState(null);

  const [errors, setErrors] = useState(null);

   // File Uploading
   const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
   };

   const handleSubmit = async (event) => {
      console.log('clicked!')
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
        const res = await moduleGenerationAPI.bodyPdfToWordToMarkdownOneSection(section_id, formData)
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

   const handleAddContentClick = async () => {
      try {
         const res = await modulesAPI.addSectionContent(section_id, markdownContent)

         if (res.status < 200 || res.status >= 300) { 
           console.log(`An error occurred when adding the section content to the database. Status: ${res.status}`)
           throw new Error('Unable to add the section content');
         }

         navigate(`/admin/module/${creator_id}/${module_id}`)

       } catch (err) {
         setErrors(err);
         return
       }
   }
   


  return (
    <div className = "flex-container-col">
      { ! markdownContent &&
      <form onSubmit = {handleSubmit}>
         <label htmlFor="file-upload"> Upload PDF File </label>
         <input type="file" id="file-upload" accept=".pdf" onChange={handleFileChange} />
         <button type="submit" className="global-button"> Upload File </button>
      </form>
      }  
      { markdownContent &&
      <>
         <div className = "top-bar"> <button onClick={() => handleAddContentClick()} className="global-button">ADD CONTENT</button></div>
         <div className = "markdown-content">{markdownContent}</div> 
      </>
      }
    </div>
  )
}

export default AdminAddContent