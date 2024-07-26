// React / React Library imports
import { useState, useEffect } from 'react';
import * as Form from '@radix-ui/react-form';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { SquarePlus } from "lucide-react";

// Context imports 
import useLogContext from 'hooks/useLogContext';

// Componenet imports
import { Spinner } from 'components'

// API imports
import modulesAPI from 'api_link/modules.js'
import tagsAPI from 'api_link/tags.js'

// Styling
import "styles/components/addmodule.css";


const Test = () => {

  const [loading, setLoading] = useState(false);
  const { development } = useLogContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  
  const [tagOptionsLoading, setTagOptionsLoading] = useState(true);
  const [tagOptionsArray, setTagOptionsArray] = useState([]);

  const [selectedTag, setSelectedTag] = useState();

  // Fake
  const creator_id = "1";
  const [hash, setHash] = useState(null);

  
  useEffect( () => {
    const fetchData = async () => {
      try {
        const res = await tagsAPI.getAllTags()
    
        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          throw new Error(`${res.data}. Status: ${res.status}`);
        }

        const content = res.data
        const tags_data = content.data
        const tagOptions = tags_data.map(tag => tag.tag_name)
        setTagOptionsArray(tagOptions);

      } catch (err) {
        setErrors(err);
        if ( development ) {
          console.log(err.message)
        }
      } finally {
        setTagOptionsLoading(false);
        console.log('Tag options array:', tagOptionsArray)
      }
    }

    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formdata = {
      module_name: moduleTitle,
      module_description: moduleDescription,
    };

    try {
        const res = await modulesAPI.create(creator_id, formdata)

        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
        if ( development ) {
          setErrors(res.data.detail)
        } else {
          setErrors('There was an error creating your module')
        }
        return
      }
        let content = res.data
        if ( development ) {
          console.log(content.detail)
        } 

        navigate(`/admin/all-modules/${creator_id}`)
    } catch (err) {
      setErrors(err.message);
      if ( development ) {
        console.log(err.message)
      }
    } finally {
      setLoading(false);
    }
   }

   const handleTagChange = (e) => {
      setSelectedTag(e.target.value);
   };


   return (
      <div className="flex-form-container">
        <div className = "global-form">
          { errors && <div className = "error-message"> { errors }</div>}
          <Form.Root onSubmit={handleSubmit}>
            <div className="global-form-group">
              <Form.Field name="module_name">
                <Form.Label>Module Title</Form.Label>
                <Form.Control asChild>
                  <input 
                    id="module-title" 
                    type="text" 
                    value={moduleTitle} 
                    onChange={(e) => setModuleTitle(e.target.value)}
                    required 
                  />
                </Form.Control>
                <Form.Message match="valueMissing" className="error-message">Module Title is required</Form.Message>
              </Form.Field>
            </div>
            <div className="global-form-group">
              <Form.Field name="module_description">
                <Form.Label>Module Description</Form.Label>
                <Form.Control asChild>
                  <input 
                    id="module-description" 
                    type="text" 
                    value={moduleDescription} 
                    onChange={(e) => setModuleDescription(e.target.value)} 
                    required
                  />
                </Form.Control>
                <Form.Message match="valueMissing" className="error-message">A brief Module description is required</Form.Message>
              </Form.Field>
            </div>

            <div className="global-form-group flex-adjusted">
            <Form.Field name="tag_name" className="tag-input-field">
              <Form.Label>Tag</Form.Label>
              <Form.Control asChild>
                {tagOptionsLoading ? (
                  <div className="select-placeholder">
                    <BeatLoader />
                  </div>
                ) : (
                  <select 
                    id="tag-name" 
                    value={selectedTag} 
                    onChange={handleTagChange} 
                    required
                  >
                    <option value="">Select a tag</option>
                    {tagOptionsArray.map((tag) => (
                      <option key={tag.name} value={tag.name}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                )}
              </Form.Control>
              <Form.Message match="valueMissing" className="error-message">A tag is required.</Form.Message>
            </Form.Field>
            <a href="#add-tag" className="global-trans-button"><SquarePlus className="add-tag-logo"/></a>
          </div>


            <div className = "global-flex-form-button-container">
              <Form.Submit asChild>
                <button type="submit" className = "global-form-submit-button">
                  {loading ? <BeatLoader /> : 'Create Module'}
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </div>
      </div>
    )
};

export default Test;