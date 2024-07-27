import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/modules`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class ModulesAPILink {
   // Modules
   addModule(creator_id, body) {
      return axiosConfig.post(baseURL + `/add-module/${creator_id}`, body);
   }

   getModule(module_id) {
      return axiosConfig.get(baseURL + `/get-module/${module_id}`);
   }

   getModuleFullDetail(module_id) {
      return axiosConfig.get(baseURL + `/get-all-module-detail/${module_id}`);
   }

   deleteModule(module_id) {
      return axiosConfig.delete(baseURL + `/delete-module/${module_id}`);
   }

   // Parts
   addPart(module_id, body) {
      return axiosConfig.post(baseURL + `/parts/add-part/${module_id}`, body);
   }

   // Sections
   getSection(section_id) {
      return axiosConfig.get(baseURL + `/sections/get-section/${section_id}`);
   }

   getSectionFullDetail(section_id) {
      return axiosConfig.get(baseURL + `/get-all-section-detail/${section_id}`);
   }

   addSectionContent(section_id, body) {
      return axiosConfig.post(baseURL + `/add-section-content/${section_id}`, body);
   }

   addSectionContentSummary(section_id) {
      return axiosConfig.post(baseURL + `/add-section-content-summary/${section_id}`);
   }

}


const modulesAPILink = new ModulesAPILink();
export default modulesAPILink;