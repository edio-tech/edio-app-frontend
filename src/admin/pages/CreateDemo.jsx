import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from 'react-spinners';

// Hooks
import useLogContext from "hooks/useLogContext";
import useAdminNavbar from "hooks/useAdminNavbar";

// API imports
import tagsAPI from 'api_link/tags.js'
import demosAPI from 'api_link/demo.js'
import modulesAPI from 'api_link/modules.js'


const CreateDemo = () => {

  const navigate = useNavigate();
  const { development } = useLogContext();
  const { creator_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [moduleTitle, setModuleTitle] = useState();
  const [selectedTag, setSelectedTag] = useState();
  const [moduleContent, setModuleContent] = useState();

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
      setLeftName('');
      setLeftAction(null);
      setTitleName('Create Demo');
      setRightName();
      setRightAction(null);
  }, []);

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
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('tag_name:',selectedTag)

    const formdata = {
      module_name: moduleTitle,
      tag_name: selectedTag
    };

    try {
      const res = await modulesAPI.addModule(creator_id, formdata)

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          setErrors(res.data.detail)
        } else {
          setErrors('There was an error creating the demo module')
        }
        return
      }
      let content = res.data
      if (development) {
        console.log(content.detail)
      } 

      const incoming_module_data = content.data
      const module_id = incoming_module_data._id
      console.log('module_id check:', module_id)
      const req_2_body = {
        "content" : moduleContent
      }

      const res_2 = await demosAPI.generateDemo(module_id, req_2_body)

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          setErrors(res.data.detail)
        } else {
          setErrors('There was an error building out the demo module')
        }
        return
      }
      let content_2 = res_2.data
      if (development) {
        console.log(content.detail)
      } 
      
      navigate(`/admin/demo/${module_id}/success`)

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
    <div className = "flex-container">
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
          </div>

          <div className="global-form-group">
            <label htmlFor="module-title">Module Content</label>
            <textarea  
              className = "module-content"
              id="module-content" 
              type="text" 
              value={moduleContent} 
              onChange={(e) => setModuleContent(e.target.value)}
              required 
            />
          </div>
          <div className="global-flex-form-button-container">
            <button type="submit" className="global-form-submit-button">
              {loading ? <BeatLoader /> : 'Create Module'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreateDemo;