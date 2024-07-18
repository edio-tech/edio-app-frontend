import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/module-generation`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class ModuleGenerationAPILink {

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
   
}


const moduleGenerationAPILink = new ModuleGenerationAPILink();
export default moduleGenerationAPILink;