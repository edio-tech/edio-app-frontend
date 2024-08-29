import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/module-generation`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class ModuleGenerationAPILink {

   buildOutmodule(module_id, body) {
      return axiosConfig.post(baseURL + `/contents-as-json-to-db/${module_id}`, body);
   }

   bodyPdfToWordToMarkdownOneSection(section_id, body) {
      return axiosConfig.post(baseURL + `/pdf-to-word-to-markdown-one-section/${section_id}`, body);
   }
   
   bodyPdfToWordToMarkdown(module_id, body) {
      return axiosConfig.post(baseURL + `/pdf-to-word-to-markdown/${module_id}`, body);
   }

   bodyMarkdownToThreeLayers(module_id, body) {
      return axiosConfig.post(baseURL + `/body-markdown-to-json/${module_id}`, body);
   }

   bodyMarkdownToTwoLayers(module_id) {
      return axiosConfig.post(baseURL + `/markdown-to-two-layers/${module_id}`);
   }
   
   bodyJsonToDatabase(module_id, body) {
      return axiosConfig.post(baseURL + `/body-as-json-to-db/${module_id}`, body);
   }

   convertPdfToMarkdownLLMStructured(module_id, formData) {
      return axiosConfig.post(
         baseURL + `/convert-pdf-to-markdown-llm-structured-content/${module_id}`,
         formData,
         {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         }
      );
   }

   convertPdfToMarkdownLLMUnstructured(module_id, formData) {
      return axiosConfig.post(
         baseURL + `/convert-pdf-to-markdown-llm-unstructured-content/${module_id}`,
         formData,
         {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         }
      );
   }
   
}


const moduleGenerationAPILink = new ModuleGenerationAPILink();
export default moduleGenerationAPILink;