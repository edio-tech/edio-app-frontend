// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from '@radix-ui/react-form';
import Cookies from 'js-cookie';

// API imports
import creatorsAPI from "api_link/creators.js"
import UsersAPI from "api_link/users.js"

// Components
import { Spinner } from 'components'

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Context imports
import useLogContext from "hooks/useLogContext";


// This doesnt work, stopped halfway through creating it.

const AdminAddCreator = () => {

  const { development } = useLogContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const [userOptionsLoading, setUserOptionsLoading] = useState(null);
  const [userOptionsArray, setUserOptionsArray] = useState([]);

  const [loading, setLoading] = useState(false);

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    setLeftName('All Creators');
    setLeftAction(() => () => navigate('/admin/all-creators'));
    setTitleName('Add Creator');
    setRightName('');
    setRightAction(null);
  }, [])

  useEffect( () => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('jwtToken')
        const res = await UsersAPI.getAllUsers(token)
    
        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          throw new Error(`${res.data}. Status: ${res.status}`);
        }

        const content = res.data
        const users = content
        console.log('users:', users)
        setUserOptionsArray(users)

      } catch (err) {
        setErrors(err.message);
        if ( development ) {
          console.log(err.message)
        }
      } finally {
        setUserOptionsLoading(false);
      }
    }

    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await creatorsAPI.addCreator(formdata)

      if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
        if ( development ) {
            setErrors(res.data.detail)
        } else {
            setErrors('There was an error creating the Tag.')
        }
        return
      }

      let content = res.data
      if ( development ) {
      console.log(content.detail)
      } 
      // Add logic to add the creator info to Craetor context so a page refresh is not required.
      navigate('/admin/all-creators')

    } catch (err) {
      setErrors(err.message);
      if ( development ) {
        console.log(err.message)
      }
    } finally {
      setLoading(false);
    }
 }

  return (
    <div className = "flex-container mrg">
      <div className = "global-form">
         { errors && <div className = "error-message"> { errors }</div>}
         <Form.Root onSubmit={handleSubmit}>
         <div className="global-form-group">
              <Form.Field name="user_name" >
                <Form.Label>User</Form.Label>
                <Form.Control asChild>
                  <>
                  <select id="tag-name" required>
                    <option style = {{ color: "black" }} value="">Select a user</option>
                    { userOptionsLoading && <Spinner className = "mrg"/> }
                    { !userOptionsLoading &&
                    <>
                    {userOptionsArray.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                    </>
                    }
                  </select>
                  </>
                </Form.Control>
                <Form.Message match="valueMissing" className="error-message">A user is required.</Form.Message>
              </Form.Field>
            </div>
            <div className="global-form-group">
               <Form.Field name="user_id">
                  <Form.Label>Tag Name</Form.Label>
                  <Form.Control asChild>
                  <input id="creator_description" type="text" required/>
                  </Form.Control>
                  <Form.Message match="valueMissing" className="error-message">Tag name is required</Form.Message>
               </Form.Field>
            </div>
            <div className="global-form-group">
               <Form.Field name="tag_description">
                  <Form.Label>Tag Description</Form.Label>
                  <Form.Control asChild>
                  <input id="tag-description" type="text" required/>
                  </Form.Control>
                  <Form.Message match="valueMissing" className="error-message">A brief tag description is required</Form.Message>
               </Form.Field>
            </div>
            <div className = "global-flex-form-button-container">
               <Form.Submit asChild>
                  <button type="submit" className = "global-form-submit-button">
                  {loading ? <BeatLoader /> : 'Add Tag'}
                  </button>
               </Form.Submit>
            </div>
         </Form.Root>
      </div>
    </div>
  )
}

export default AdminAddCreator