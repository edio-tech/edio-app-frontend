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

   getAllQuestionsFromCreator(creator_id, body)
   {
      return axiosConfig.post(baseURL + `/all-questions-from-creator/${creator_id}`, body);
   }

   reviewQuestion(question_id, body)
   {
      return axiosConfig.post(baseURL + `/question-reviewed-by-expert/${question_id}`, body);
   }
}


const questionsAPILink = new QuestionsAPILink();
export default questionsAPILink;