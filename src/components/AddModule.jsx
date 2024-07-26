import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { SquarePlus } from "lucide-react";

import useLogContext from 'hooks/useLogContext';
import modulesAPI from 'api_link/modules.js'
import tagsAPI from 'api_link/tags.js'

import "styles/components/addmodule.css";

const AddModule = ({ creator_id, hash, moduleTitle, setModuleTitle, moduleDescription, setModuleDescription, selectedTag, setSelectedTag }) => {

  const [loading, setLoading] = useState(false);
  const { development } = useLogContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  
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
    setSubmitAttempted(true);
    e.preventDefault();
    setLoading(true);

    const formdata = {
      module_name: moduleTitle,
      module_description: moduleDescription,
      tag_name: selectedTag
    };

    try {
      const res = await modulesAPI.create(creator_id, formdata)

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
      navigate(`/admin/all-modules/${creator_id}`)
      
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
            <label htmlFor="module-description">Module Description</label>
            <input 
              id="module-description" 
              type="text" 
              value={moduleDescription} 
              onChange={(e) => setModuleDescription(e.target.value)} 
              required
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
            <button type="submit" className="global-form-submit-button" disabled={loading}>
              {loading ? <BeatLoader /> : 'Create Module'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModule;