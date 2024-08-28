import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/questions`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class QuestionsAPILink {

   addMultipleGoalsAndQuestions(section_id, body) {
      return axiosConfig.post(baseURL + `/bulk-add-questions-and-goals/${section_id}`, body);
   }

   getAllQuestionsFromCreator(creator_id)
   {
      return axiosConfig.get(baseURL + `/all-questions-from-creator/${creator_id}`);
   }
}


const questionsAPILink = new QuestionsAPILink();
export default questionsAPILink;