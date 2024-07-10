import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/chats`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class ChatsAPILink {

   chat(body) {
      return axiosConfig.post(baseURL + '/chatbot-test/667967c4fdfc44a96f5de46a', body);
   }
}

const chatsAPILink = new ChatsAPILink();
export default chatsAPILink;