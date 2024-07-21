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
   const [errors, setErrors] = useState(null);
   const redirect = '/admin/all-creators'

   useEffect(() => {
      if ( auth?.id ) {
         navigate(redirect)
      } 
   }, [navigate])

   const { auth, setAuth } = useAuth();

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
      throw Error('This is currently only set up for Admin Logins!')
     }
   }; 

   return (
      <div className="flex-container">
      <div className="login-container">
         <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
               <label htmlFor="email">Email:</label>
               <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
               <label htmlFor="password">Password:</label>
               <input type="password" id="password" name="password" required />
            </div>
            <div className = "form-button-group">
            <button type="submit" className="login-button global-button" disabled={loading}>
               {loading ? 'Logging in...' : 'Login'}
            </button>
            </div>
            <div className = "white-line"></div>
            <div className="form-footer">
               <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
               <span className="signup-link">Don't have an account? - <a href="#sign-up">Sign up</a></span>
            </div>
         </form>
      </div>
      </div>
   );
};

export default Login