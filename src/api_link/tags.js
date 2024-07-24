import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/tags`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class TagsAPILink {

   addTag(body) {
      return axiosConfig.post(baseURL + '/add-tag', body);
   }

   getAllTags() {
      return axiosConfig.get(baseURL + '/get-all-tags');
   }
}

const tagsAPILink = new TagsAPILink();
export default tagsAPILink;