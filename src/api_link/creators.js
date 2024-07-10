import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/users/creators`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class CreatorsAPILink {

   getAll() {
      return axiosConfig.get(baseURL + '/get-all');
   }

   getCreator(creator_id) {
      return axiosConfig.get(baseURL + `/get/${creator_id}`);
   }
   
}


const creatorsAPILink = new CreatorsAPILink();
export default creatorsAPILink;