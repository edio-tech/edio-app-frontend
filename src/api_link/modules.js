import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/modules`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class ModulesAPILink {
   // Modules
   create(creator_id, body) {
      return axiosConfig.post(baseURL + `/add-module/${creator_id}`, body);
   }
   
   buildOutmodule(module_id, body) {
      return axiosConfig.post(baseURL + `/contents-as-json-to-db/${module_id}`, body);
   }

   getModule(module_id) {
      return axiosConfig.get(baseURL + `/get-module/${module_id}`);
   }

   // Sections
   getSection(section_id) {
      return axiosConfig.get(baseURL + `/sections/get-section/${section_id}`);
   }
}


const modulesAPILink = new ModulesAPILink();
export default modulesAPILink;