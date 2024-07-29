import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/users`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class UsersAPILink {
   register(body)
   {
      return axiosConfig.post(baseURL + '/register', body);
   }

   login(body) {
      return axiosConfig.post(baseURL + '/login/', body);
   }

   updateProfilePic(id, body)
   {
      return axiosConfig.patch(baseURL + `/add-creator-profile-pic-for-demo/${id}`, body);
   }

   getAllUsers(token) {
      return axiosConfig.get(baseURL + '/get-all-users/', {headers: {Authorization: `Bearer ${token}`}});
   }

   checkDetails(token) {
      return axiosConfig.get(baseURL + '/me', {headers: {Authorization: `Bearer ${token}`}});
   }

   addCreator(body)
   {
      return axiosConfig.post(baseURL + '/creators/add-creator-profile', body);
   }
}


const usersAPILink = new UsersAPILink();
export default usersAPILink;