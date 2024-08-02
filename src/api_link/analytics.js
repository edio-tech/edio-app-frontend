import axios from 'axios';
import BASEURL from './baseurl.js'

let baseURL = `${BASEURL}/analytics`

let axiosConfig = axios.create({
   validateStatus: () => true
});

class AnalyticsAPILink {
    getFirstScorePerUserInSection(section_id)
    {
        return axiosConfig.get(baseURL + `/first-score-per-user-in-section/${section_id}`);
    }
}
const anlayticsAPILink = new AnalyticsAPILink();
export default anlayticsAPILink;
