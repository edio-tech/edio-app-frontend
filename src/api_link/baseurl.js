/* Cant ger this working as an enviroment variable */

//let BASEURL = import.meta.env.MODE === 'development' ? 'http://127.0.0.1:8001' : 'https://edio-app-backend.onrender.com';
let BASEURL = 'http://127.0.0.1:8001';
console.log('Base URL: ', BASEURL);
export default BASEURL;