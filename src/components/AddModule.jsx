import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { SquarePlus } from "lucide-react";

// API imports
import modulesAPI from 'api_link/modules.js'
import tagsAPI from 'api_link/tags.js'

// Context
import useCreatorContext from 'hooks/useCreatorContext';
import useLogContext from 'hooks/useLogContext';

// Styling
import "styles/components/addmodule.css";

const AddModule = ({ creator_id, hash, moduleTitle, setModuleTitle, moduleDescription, setModuleDescription, selectedTag, setSelectedTag }) => {

  const [loading, setLoading] = useState(false);
  const { development } = useLogContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const { creatorData, setCreatorData, moduleSummary, setModuleSummary } = useCreatorContext();
  
  const [tagOptionsLoading, setTagOptionsLoading] = useState(true);
  const [tagOptionsArray, setTagOptionsArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await tagsAPI.getAllTags()
    
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`${res.data}. Status: ${res.status}`);
        }

        const content = res.data
        const tags_data = content.data
        const tagOptions = tags_data.map(tag => tag.tag_name)
        setTagOptionsArray(tagOptions);

      } catch (err) {
        setErrors(err.message);
        if (development) {
          console.log(err.message)
        }
      } finally {
        setTagOptionsLoading(false);
      }
    }

    fetchData();
  }, [hash])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = {
      module_name: moduleTitle,
      module_description: moduleDescription,
      tag_name: selectedTag
    };

    try {
      const res = await modulesAPI.addModule(creator_id, formdata)

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          setErrors(res.data.detail)
        } else {
          setErrors('There was an error creating your module')
        }
        return
      }
      let content = res.data
      if (development) {
        console.log(content.detail)
      } 

      const incoming_module_data = content.data

      // Update creatorData
      setCreatorData(prevData => {
        const updatedData = [...prevData];
        const creatorIndex = updatedData.findIndex(creator => creator._id === incoming_module_data.creator_id);
        
        if (creatorIndex !== -1) {
          const updatedCreator = {...updatedData[creatorIndex]};
          const newModule = {
            [incoming_module_data._id]: {
              order_number: Object.keys(updatedCreator.modules).length + 1,
              module_name: incoming_module_data.module_name,
              module_image: '' // Assuming the incoming data doesn't include an image
            }
          };
          updatedCreator.modules = {...updatedCreator.modules, ...newModule};
          updatedData[creatorIndex] = updatedCreator;
        }

        return updatedData;
      });

      // Update moduleSummary
      setModuleSummary(prevSummary => {
        const newSummaryItem = {
          creator_id: incoming_module_data.creator_id,
          id: incoming_module_data._id,
          module_image: '',
          module_name: incoming_module_data.module_name,
          order_number: moduleSummary.filter(item => item.creator_id === incoming_module_data.creator_id).length + 1
        };
        return [...prevSummary, newSummaryItem];
      });

      navigate(`/admin/module/${creator_id}/${incoming_module_data._id}`)

    } catch (err) {
      setErrors(err.message);
      if (development) {
        console.log(err.message)
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-form-container">
      <div className="global-form">
        {errors && <div className="error-message">{errors}</div>}
        <form onSubmit={handleSubmit}>
          <div className="global-form-group">
            <label htmlFor="module-title">Module Title</label>
            <input 
              id="module-title" 
              type="text" 
              value={moduleTitle} 
              onChange={(e) => setModuleTitle(e.target.value)}
              required 
            />
          </div>
          <div className="global-form-group">
            <label htmlFor="module-description">Module Description (Optional)</label>
            <input 
              id="module-description" 
              type="text" 
              value={moduleDescription} 
              onChange={(e) => setModuleDescription(e.target.value)} 
            />
          </div>
          <div className="global-form-group flex-adjusted">
            <div className="tag-input-field">
              <label htmlFor="tag_name">Tag</label>
              {tagOptionsLoading ? (
                <div className="select-placeholder">
                  <BeatLoader />
                </div>
              ) : (
                <select 
                  id="tag_name" 
                  value={selectedTag} 
                  onChange={(e) => setSelectedTag(e.target.value)} 
                  required
                >
                  <option value="" disabled>Select a tag</option>
                  {tagOptionsArray.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <a href="#add-tag" className="global-trans-button"><SquarePlus className="add-tag-logo"/></a>
          </div>
          <div className="global-flex-form-button-container">
            <button type="submit" className="global-form-submit-button">
              {loading ? <BeatLoader /> : 'Create Module'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModule;