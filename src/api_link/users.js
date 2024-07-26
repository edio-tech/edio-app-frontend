import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/users`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class UsersAPILink {

   login(body) {
      return axiosConfig.post(baseURL + '/login/', body);
   }

   getAllUsers(token) {
      return axiosConfig.get(baseURL + '/get-all-users/', {headers: {Authorization: `Bearer ${token}`}});
   }

   checkDetails(token) {
      return axiosConfig.get(baseURL + '/me', {headers: {Authorization: `Bearer ${token}`}});
   }
}


const usersAPILink = new UsersAPILink();
export default usersAPILink;