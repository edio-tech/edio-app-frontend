// React / React Library imports
import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

// Context imports 
import useLogContext from 'hooks/useLogContext';

// API imports
import modulesAPI from 'api_link/modules.js'

// Styling
import "styles/components/addmodule.css";


const AddModule = ({ creator_id }) => {

   const [loading, setLoading] = useState(false);
   const { development} = useLogContext();
   const [errors, setErrors] = useState(null);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();

      const formdata = Object.fromEntries(new FormData(e.currentTarget));
      try {
         const res = await modulesAPI.create(creator_id, formdata)
         if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
            throw new Error(`Failed to create a new module for creator with ID ${creator_id}. Status: ${res.status}`);
         }
         let content = res.data
         if ( development ) {
            console.log(content.detail)
         } 
         localStorage.setItem('moduleAdded', 'true');
         setLoading(false);
         navigate(`/admin/all-modules/${creator_id}`)
      } catch (err) {
         setErrors(err);
         if ( development ) {
            console.log(err.message)
         }
      }
   }


   return (
      <div className="dark-form-container">
        <div className="form-title">
          Enter the Module Details Below
        </div>
        <Form.Root onSubmit={handleSubmit}>
          <div className="form-field">
            <Form.Field name="module_name">
              <Form.Label className="form-label">Module Title</Form.Label>
              <Form.Message match="valueMissing" className="text-danger">Module Title is required</Form.Message>
              <Form.Control asChild>
                <input id="module-title" type="text" required className="form-input" />
              </Form.Control>
            </Form.Field>
          </div>
          <div className="form-field">
            <Form.Field name="module_description">
              <Form.Label className="form-label">Module Description</Form.Label>
              <Form.Message match="valueMissing" className="text-danger">A brief Module description is required</Form.Message>
              <Form.Control asChild>
                <input id="module-description" type="text" required className="form-input" />
              </Form.Control>
            </Form.Field>
          </div>
          <div className="form-field">
            <Form.Field name="tag_name">
              <Form.Label className="form-label">Tag</Form.Label>
              <Form.Message match="valueMissing" className="text-danger">A tag is required as it is injected into the question generation prompt.</Form.Message>
              <Form.Control asChild>
                <input id="tag-name" type="text" required className="form-input" />
              </Form.Control>
            </Form.Field>
          </div>
          <div className="form-field">
            <Form.Submit asChild>
              <button type="submit" className="form-submit">
                {loading ? <BeatLoader /> : 'Create Module'}
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    )
};

export default AddModule;