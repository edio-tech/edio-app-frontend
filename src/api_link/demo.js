import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/demo`

let axiosConfig = axios.create({
   validateStatus: () => true
});


class DemoAPILink {
   
   bodyPdfToMarkdownDemo(section_id, body) {
      return axiosConfig.post(baseURL + `/pdf-to-markdown-demo/${section_id}`, body);
   }

   bodyMarkdownToGoalsDemo(section_id) {
      return axiosConfig.post(baseURL + `/markdown-to-goals-demo/${section_id}`);
   }

   goalsToQuestionsDemo(section_id) {
      return axiosConfig.post(baseURL + `/goals-to-questions-demo/${section_id}`);
   }

}

const demoAPILink = new DemoAPILink();
export default demoAPILink;