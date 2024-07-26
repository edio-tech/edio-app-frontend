import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/question-generation`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class QuestionGenerationAPILink {

   generateGoalsAndQuestionsForSection(section_id) {
      return axiosConfig.post(baseURL + `/generate-goals-and-questions-for-section/${section_id}`);
   }
}

const questionGenerationAPILink = new QuestionGenerationAPILink();
export default questionGenerationAPILink;