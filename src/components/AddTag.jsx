import useLogContext from "hooks/useLogContext"
import * as Form from '@radix-ui/react-form';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from 'react-spinners';

// API Imports
import tagsAPI from 'api_link/tags.js'


const AddTag = ({ setHash }) => {

   const { development } = useLogContext();
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState(null);

   const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
  
      const formdata = Object.fromEntries(new FormData(e.currentTarget));
      try {
          const res = await tagsAPI.addTag(formdata)
  
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
         setHash('')

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
      <div className = "global-form">
         { errors && <div className = "error-message"> { errors }</div>}
         <Form.Root onSubmit={handleSubmit}>
            <div className="global-form-group">
               <Form.Field name="tag_name">
                  <Form.Label>Tag Name</Form.Label>
                  <Form.Control asChild>
                  <input id="tag-name" type="text" required/>
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
   )
}

export default AddTag