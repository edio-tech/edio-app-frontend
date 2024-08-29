import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/users`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class UsersAPILink {

   // Users

   register(body)
   {
      return axiosConfig.post(baseURL + '/register', body);
   }

   login(body) {
      console.log(baseURL);
      return axiosConfig.post(baseURL + '/login/', body);
   }

   updateProfilePic(id, file, token) {
      const formData = new FormData();
      formData.append('profile_picture', file);
  
      return axiosConfig.patch(`${baseURL}/update-profile-pic/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
    }
   
   updateProfilePicCreator(id, body)
   {
      return axiosConfig.patch(baseURL + `/add-creator-profile-pic-for-demo/${id}`, body);
   }

   getAllCreatorAndAdminUsers(token) {
      return axiosConfig.get(baseURL + '/get-all-creator-and-admin-users/', {headers: {Authorization: `Bearer ${token}`}});
   }

   checkDetails(token) {
      console.log(baseURL);
      return axiosConfig.get(baseURL + '/me', {headers: {Authorization: `Bearer ${token}`}});
   }
}

const usersAPILink = new UsersAPILink();
export default usersAPILink;