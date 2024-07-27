import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/users/creators`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class CreatorsAPILink {

   addCreator(body) {
      return axiosConfig.get(baseURL + '/creators/add-creator-profile', body);
   }

   getAll(token) {
      return axiosConfig.get(baseURL + '/get-all-new', {headers: {Authorization: `Bearer ${token}`}});
   }

   getCreator(creator_id) {
      return axiosConfig.get(baseURL + `/get/${creator_id}`);
   }
   
}


const creatorsAPILink = new CreatorsAPILink();
export default creatorsAPILink;