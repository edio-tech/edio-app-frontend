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
      <div className = "flex-container">
         <Form.Root onSubmit = {handleSubmit}>
            <div className = "flex-form-container">
               <div className = "form-title">
                  Log in below
               </div>
               <div className = "form-element-email">
                  <Form.Field name = "email">
                     <Form.Message match="valueMissing">Email is required</Form.Message>
                     <Form.Message match="typeMismatch">Please enter a valid email</Form.Message>
                     <Form.Control asChild>
                        <input type="email" placeholder = "Enter your admin email..." required />
                     </Form.Control>
                  </Form.Field>
               </div>
               <div className = "form-element-password">
                  <Form.Field name = "password">
                     <Form.Message className="FormMessage" match="valueMissing"> Enter your password </Form.Message>
                     <Form.Control asChild>
                        <input type = "password" placeholder = "Enter your password..." required />
                     </Form.Control>
                  </Form.Field>
               </div>
               <div className = "form-button-element">
                  <Form.Submit asChild>
                     <button type = "submit" className = "login-button global-button"> {
                        loading ? <><BeatLoader /></> : <> LOG IN </>
                     }         
                     </button>
                  </Form.Submit>
               </div>
            </div>
         </Form.Root>
      </div>

   )
};

export default Login