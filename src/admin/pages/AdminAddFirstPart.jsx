import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useLogContext from "hooks/useLogContext"
import * as Form from '@radix-ui/react-form';
import { BeatLoader } from 'react-spinners';

// Context 
import useModuleContext from 'hooks/useModuleContext'; 

// Hooks
import useAdminNavbar from 'hooks/useAdminNavbar';

// API Imports
import modulesAPI from 'api_link/modules.js'

const AdminAddFirstPart = () => {

  const { development } = useLogContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { creator_id, module_id } = useParams();

  const { moduleData, setModuleData } = useModuleContext();

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();;

  useEffect(() => {
    setLeftName('Build Out Options');
    setLeftAction(() => () => navigate(`/admin/module/${creator_id}/${module_id}`));
    setTitleName('Add First Part');
    setRightName('');
    setRightAction(null);
  }, [])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await modulesAPI.addPart(module_id, formdata)

      if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
        if ( development ) {
          console.log(res.data.detail)
          if (res.status === 422) {
            setErrors('Error 422 - Unprocessible Entity for FastAPI Route. Check browser console')
          } else {
            setErrors(res.data.detail)
          }
        } else {
          setErrors('There was an error creating the first part.')
        }
        return
      }

      let content = res.data
      if ( development ) {
      console.log(content.detail)
      } 

      const new_part = content.data
      // Update moduleData with the new part
      setModuleData(prevData => {
        return prevData.map(module => {
          if (module._id === module_id) {
            return {
              ...module,
              parts: {
                ...module.parts,
                [new_part._id]: new_part
              }
            };
          }
          return module;
        });
    });

      navigate(`/admin/module/${creator_id}/${module_id}`)

    } catch (err) {
      console.log('error:', err)
      setErrors(err.detail);
      if ( development ) {
        console.log(err.detail)
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className = "flex-container">
      <div className = "global-form">
         { errors && <div className = "error-message"> { errors }</div>}
         <Form.Root onSubmit={handleSubmit}>
            <div className="global-form-group">
               <Form.Field name="part_name">
                  <Form.Label>Part Name</Form.Label>
                  <Form.Control asChild>
                  <input id="part-name" type="text" required/>
                  </Form.Control>
                  <Form.Message match="valueMissing" className="error-message">Part name is required</Form.Message>
               </Form.Field>
            </div>
            <div className="global-form-group">
               <Form.Field name="part_description">
                  <Form.Label>Part Description (Optional)</Form.Label>
                  <Form.Control asChild>
                  <input id="part-description" type="text"/>
                  </Form.Control>
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

export default AdminAddFirstPart;




