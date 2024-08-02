// React / React Library imports
import * as Form from '@radix-ui/react-form';
import { BeatLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Other imports
import Cookies from 'js-cookie';

// Custom imports
import usersAPI from 'api_link/users';
import useLogContext from 'hooks/useLogContext';
import useAuth from 'hooks/useAuth';

// Styling
import 'styles/pages/login.css'

const Login = () => {

   const { development } = useLogContext();
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const { auth, setAuth } = useAuth();
   const [errors, setErrors] = useState(null);
   const redirect = '/admin/all-creators'

   const [hash, setHash] = useState(window.location.hash);
   useEffect(() => {
      if ( auth?.id ) {
         navigate(redirect)
      } 
   }, [navigate])

   useEffect(() => {
      const handleHashChange = () => {
        setHash(window.location.hash);
      };

      window.addEventListener('hashchange', handleHashChange);

      // Clean up the event listener when the component unmounts
      return () => {
         window.removeEventListener('hashchange', handleHashChange);
      };

   }, []);


   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const data = Object.fromEntries(new FormData(e.currentTarget));
      

      const res = await usersAPI.login(data);
      setLoading(false);
      if ( res['status'] !== 200) {
         let errors = await res['data']
         /* Add a way to display login errors */
         if ( development ) {
            console.log('Login Failed.', errors)
         }
         setErrors(errors);
         return
      }
      const userDetails  = await res['data'];
      if ( development ) {
         console.log('Login Successful', userDetails)
      }
      let userAuth = {
         'id': userDetails['user']['_id'],
         'name': userDetails['user']['name'],
         'email': userDetails['user']['email'],
         'role': userDetails['user']['role'],
         'creators' : userDetails['user']['your_creators'],
         'token': userDetails['token']
     }
     if ( userAuth.role === 'ADMIN' ) {
      Cookies.set('jwtToken', userDetails['token'], { expires: 1 });
      setAuth(userAuth);
      navigate(redirect)
     } else {
      throw Error('This is currently only set up for Administrators. If you wish to book a demo please do so on the home page.')
     }
   }; 

   return (
      <div className="flex-container">
         <div className="flex-form-container">
         { errors && <div className = "error-message"> { errors.detail } </div>}
            <form onSubmit={handleSubmit} className="global-form">
               <div className="global-form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
               </div>
               <div className="global-form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" required />
               </div>
               <div className = "global-form-button-group">
                  
               <button type="submit" className="global-form-submit-button global-button" disabled={loading}>
                  {loading ? <BeatLoader /> : 'Login'}
               </button>
               </div>
               <div className = "white-line"></div>
               <div className="form-footer">
                  <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
                  <span className="signup-link">Don't have an account? - <a href="#sign-up">Sign up</a></span>
               </div>
            </form>
            { hash === '#forgot-password' && <div className = "error-message"> Functionality for resetting password will be added soon </div>}
            { hash === '#sign-up' && <div className = "error-message"> We are currently in beta and as a result are currently not accepting new sign on's </div>}
         </div>
      </div>
   );
};

export default Login