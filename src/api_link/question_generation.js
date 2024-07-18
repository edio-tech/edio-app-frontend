import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/question-generation`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class QuestionGenerationAPILink {

   bodyMarkdownToGoalsFromDatabase(section_id) {
      return axiosConfig.post(baseURL + `/markdown-to-goals-from-section-content/${section_id}`);
   }

   goalsToQuestionsFromContentInDatabase(section_id) {
      return axiosConfig.post(baseURL + `/goals-to-questions-from-section-content/${section_id}`);
   }

}

const questionGenerationAPILink = new QuestionGenerationAPILink();
export default questionGenerationAPILink;