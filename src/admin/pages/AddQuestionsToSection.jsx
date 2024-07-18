// React imports
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

// API imports
import modulesAPI from "api_link/modules.js"
import demoAPI from "api_link/demo.js"
import questionsAPI from "api_link/questions.js"

// Context imports
import useLogContext from 'hooks/useLogContext';

// Styling
import "styles/admin/addquestionstosection.css";

const AddQuestionsToSection = () => {

   const [pagerendering, setPageRendering] = useState(true);
   const { development } = useLogContext();

   const { module_id, section_id } = useParams();
   const [moduleinfo, setModuleInfo] = useState(null);
   const [moduleinfoerrors, setModuleInfoErrors] = useState(null);

   const [sectioninfo, setSectionInfo] = useState(null);
   const [sectioninfoerrors, setSectionInfoErrors] = useState(null);

   // File uploading
   const [selectedFile, setSelectedFile] = useState(null);
   const [errors, setErrors] = useState(null);
   
   useEffect(() => {
      const fetchData = async () => {
         try {
            const res_1 = await modulesAPI.getModule(module_id)
            if (res_1.status < 200 || res_1.status >= 300) { 
               const error_message = 'Failed to fetch module info.'
               console.log(`${error_message} Status: ${res_1.status}`)
               throw new Error(error_message);
            }
            let content = res_1.data;
            if ( development ) {
               console.log('module info content:',content)
            } 
            setModuleInfo(content);
         } catch (err) {
            setModuleInfoErrors(err.message)
            if ( development ) {
               console.log('Module Info error message:', err.message)
            }
         } 
         try {
            const res_2 = await modulesAPI.getSection(section_id)
            if (res_2.status < 200 || res_2.status >= 300) { 
               console.log(`Failed to fetch section info. Status: ${res_2.status}`)
               throw new Error(`Unable to retrieve section info`);
            }
            let content = res_2.data;
            if ( development ) {
               console.log('section info content:',content)
            }
            setSectionInfo(content)
         } catch (err) {
            setSectionInfoErrors(err.message)
            if ( development ) {
               console.log('Section Info error message:', err.message)
            }
         } finally {
            setPageRendering(false);
         }
      }
      fetchData();
   }, [section_id])

   // File Uploading
   const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!selectedFile) {
         console.log('You must upload a file!');
         return
      }
      const formData = new FormData();
      formData.append('file', selectedFile)
      // Convert the PDf to markdown
      
      console.log('Step 1 of 4: Converting the PDF to Markdown')
      try {
         const res_1 = await demoAPI.bodyPdfToMarkdownDemo(section_id, formData)
         if (res_1.status < 200 || res_1.status >= 300) { 
            console.log(`An error occurred when converting the PDF to markdown. Status: ${res_1.status}`)
            throw new Error('Unable to convert the PDF to markdown');
         }
      } catch (err) {
         setErrors(err);
         return
      }

      // Convert the Markdown to learning objectives
      console.log('Setp 2 of 4: Converting the markdown text to learning objectives')
      try {
         const res_2 = await demoAPI.bodyMarkdownToGoalsDemo(section_id)
         if (res_2.status < 200 || res_2.status >= 300) { 
            console.log(`An error occurred when converting the markdown to learning objectives. Status: ${res_2.status}`)
            throw new Error('Unable to convert the markdown to learning objectives');
         }
      } catch (err) {
         setErrors(err);
         return
      }
      
      // Generate questions from these learning objectives
      console.log('Step 3 of 4: Generate questions from these learning objectives')
      let res_3;
      try {
         res_3 = await demoAPI.goalsToQuestionsDemo(section_id)
         if (res_3.status < 200 || res_3.status >= 300) { 
            console.log(`An error occurred when generating the questions from the learning objectives. Status: ${res_3.status}`)
            throw new Error('Unable to generate questions from the learning objectives');
         }
      } catch (err) {
         setErrors(err);
         return
      }
      const content = res_3.data
      const questions_data = content.data

      // Upload the questions to the database
      console.log('Step 4 of 4: Upload the questions to the database')
      try {
         res_4 = await questionsAPI.addMultipleGoalsAndQuestions(section_id, questions_data)
         if (res_4.status < 200 || res_4.status >= 300) { 
            console.log(`An error occurred when uploading the questions to the database. Status: ${res_4.status}`)
            throw new Error('Unable to upload questions to the database');
         }
      } catch (err) {
         setErrors(err);
         return
      }

    };

   if ( pagerendering ) {
      return (
         <div className = "flex-container"> Loading ... </div>
      )
   }

   const renderModuleInfo = (info, errors) => {
      if ( errors ) {
         return `Error generating module info: ${errors}`
      } else {
         return info.module_name
      }
   }
   const renderSectionInfo = (info, errors) => {
      if ( errors ) {
         return `Error generating section info: ${errors}`
      } else {
         return info.section_name
      }
   }

   return (
      <div className = "flex-container">
         <div className = "flex-module-base">
            <div className = "flex-module-base">
               Module Name : {renderModuleInfo(moduleinfo, moduleinfoerrors)}
            </div>
            <div className = "flex-section-info">
               Section Name : {renderSectionInfo(sectioninfo, sectioninfoerrors)}
            </div>
            <div className = "flex-generate-questions">
               <form onSubmit = {handleSubmit}>
                  <label htmlFor="file-upload"> Upload PDF File </label>
                  <input type="file" id="file-upload" accept=".pdf" onChange={handleFileChange} />
                  <button type="submit" className="global-button"> Upload File </button>
               </form>
            </div>
         </div>
      </div>
   )
}


export default AddQuestionsToSection;