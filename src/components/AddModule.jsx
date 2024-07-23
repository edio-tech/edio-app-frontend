// React / React Library imports
import { useState, useEffect } from 'react';
import * as Form from '@radix-ui/react-form';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { SquarePlus } from "lucide-react";

// Context imports 
import useLogContext from 'hooks/useLogContext';

// Componenet imports
import { 
  Spinner,
  AddTag
 } from 'components'

// API imports
import modulesAPI from 'api_link/modules.js'
import tagsAPI from 'api_link/tags.js'

// Styling
import "styles/components/addmodule.css";


const AddModule = ({ creator_id }) => {

  const [loading, setLoading] = useState(false);
  const { development } = useLogContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  
  const [tagOptionsLoading, setTagOptionsLoading] = useState(true);
  const [tagOptionsArray, setTagOptionsArray] = useState([]);

  const [hash, setHash] = useState(window.location.hash);

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

  useEffect( () => {
    const fetchData = async () => {
      try {
        const res = await tagsAPI.getAllTags()
    
        if (res.status < 200 || res.status >= 300) { // Check if response status is not OK (200-299)
          throw new Error(`${res.data}. Status: ${res.status}`);
        }

        const content = res.data
        const tags_data = content.data
        const tagOptions = []
        tags_data.forEach(tag => {
          tagOptions.push(tag.tag_name)
        });

        setTagOptionsArray(tagOptions);
      } catch (err) {
        setErrors(err);
        if ( development ) {
          console.log(err.message)
        }
      } finally {
        setTagOptionsLoading(false);
      }
    }

    fetchData();
  }, [hash])

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.currentTarget));
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


   return (
      <div className="flex-form-container">
        { hash === '' &&
        <div className = "global-form">
          { errors && <div className = "error-message"> { errors }</div>}
          <Form.Root onSubmit={handleSubmit}>
            <div className="global-form-group">
              <Form.Field name="module_name">
                <Form.Label>Module Title</Form.Label>
                <Form.Control asChild>
                  <input id="module-title" type="text" required/>
                </Form.Control>
                <Form.Message match="valueMissing" className="error-message">Module Title is required</Form.Message>
              </Form.Field>
            </div>
            <div className="global-form-group">
              <Form.Field name="module_description">
                <Form.Label>Module Description</Form.Label>
                <Form.Control asChild>
                  <input id="module-description" type="text" required/>
                </Form.Control>
                <Form.Message match="valueMissing" className="error-message">A brief Module description is required</Form.Message>
              </Form.Field>
            </div>
            <div className="global-form-group flex-adjusted">
              <Form.Field name="tag_name" className = "tag-input-field">
                <Form.Label>Tag</Form.Label>
                <Form.Control asChild>
                  <>
                  <select id="tag-name" required>
                    <option style = {{ color: "black" }} value="">Select a tag</option>
                    { tagOptionsLoading && <Spinner/> }
                    { !tagOptionsLoading &&
                    <>
                    <button className = "global-trans-button"> Add Tag </button>
                    {tagOptionsArray.map((tag) => (
                      <option className = "mrg" key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                    </>
                    }
                  </select>
                  </>
                </Form.Control>
                <Form.Message match="valueMissing" className="error-message">A tag is required.</Form.Message>
              </Form.Field>
              <a href="#add-tag" onclassName = "global-trans-button"><SquarePlus className = "add-tag-logo"/></a>
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
        }
        { hash === '#add-tag' && <AddTag setHash={setHash} /> }
      </div>
    )
};

export default AddModule;