// React / React Library imports
import * as Form from '@radix-ui/react-form';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context imports
import useLogContext from 'hooks/useLogContext';

// API imports
import modulesAPI from 'api_link/modules.js';

const CreateDemo = () => {

   const navigate = useNavigate();
   const { development } = useLogContext();
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState(null);

   const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();

      const formdata = Object.fromEntries(new FormData(e.currentTarget));

      const res_1 = await modulesAPI.create('66867e93f958ab810f89b117', formdata)
      setLoading(false);

      if ( res_1['status'] !== 201 ) {
         let errors = await res_1['data']
         if ( development ) {
            console.log('The Module creation Failed.', errors)
         }
         setErrors(errors);
         return
      }
      
      let content_1 = res_1.data
      if ( development ) {
         console.log(content_1.detail)
      }
      let module = content_1.data
      let module_id = module._id
      let module_name = module.module_name
      
      let demo_structure = {
         "parts" : [
            {
               "part_name": `${module_name} Part`,
               "chapters": [
                  {
                     "chapter_name": `${module_name} Branch`,
                     "sections": [
                           {
                              "section_name": `${module_name} Section`
                           }
                     ]
                  }
               ]
            }
         ]
      }

      const res_2 = await modulesAPI.buildOutmodule(module_id, demo_structure)
      
      if ( res_1['status'] !== 201 ) {
         let errors = await res_1['data']
         if ( development ) {
            console.log('The Module structure creation failed', errors)
         }
         setErrors(errors);
         return
      }
      let content_2 = res_2.data
      if ( development ) {
         console.log(content_2.detail)
      }
      let section_id = content_2.data[0]["branches"][0]["sections"][0]["section_id"]

      navigate(`/demo/add-questions-demo/${module_id}/${section_id}`)

   }


   return (
      <div className = "flex-container">
         <div className = "flex-form-box">
            <div className = "form-title">
               Enter the Module Details Below
            </div>
            <Form.Root onSubmit = {handleSubmit}>
               <div className = "form-element">
                  <Form.Field name = "module_name">
                     <Form.Label> Module Title </Form.Label>
                     <Form.Message match="valueMissing"> Module Title is required </Form.Message>
                     <Form.Control asChild>
                        <input id = "module-title" type="text" required />
                     </Form.Control>
                  </Form.Field>
               </div>
               <div className = "form-element">
                  <Form.Field name = "module_description">
                     <Form.Label> Module Description </Form.Label>
                     <Form.Message match="valueMissing"> A brief Module description is required</Form.Message>
                     <Form.Control asChild>
                        <input id = "module-description" type="text" required />
                     </Form.Control>
                  </Form.Field>
               </div>
               <div className = "form-element">
                  <Form.Field name = "tag_name">
                     <Form.Label> Tag </Form.Label>
                     <Form.Message match="valueMissing"> A tag is required as it is injected into the question generation prompt. </Form.Message>
                     <Form.Control asChild>
                        <input id = "tag-name" type="text" required />
                     </Form.Control>
                  </Form.Field>
               </div>
               <div className = "form-element">
                  <Form.Submit asChild>
                     <button type = "submit" className = "global-button"> {
                        loading ? <><BeatLoader /></> : <> Create Module </>
                     }    
                     </button>
                  </Form.Submit>
               </div>

            </Form.Root>
         </div>
      </div>
   )
};

export default CreateDemo;