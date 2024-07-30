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
import usersAPILink from "api_link/users";


const CreateDemo = () => {

  const navigate = useNavigate();
  const { development } = useLogContext();
  // const { creator_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [creatorName, setCreatorName] = useState();
  const [creatorDescription, setCreatorDescription] = useState();
  const [creatorImage, setCreatorImage] = useState();

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

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      setCreatorImage(file);
  }

  const handleModuleContentChange = (e) =>
  {
    const module_content = e.target.files[0];
    setModuleContent(module_content);
  }

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

  const getRandomEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const emailLength = 4;
    let randomEmail = '';
    
    for (let i = 0; i < emailLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomEmail += chars[randomIndex];
    }
    
    return `${randomEmail}@edio.cc`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('tag_name:',selectedTag)

    // Create new user
    let new_user;
    try
    {
      const res = await usersAPILink.register({
        name: creatorName,
        profile_pic: '',
        email: getRandomEmail(),
        email_verified: false,
        password: '00000000',
        role: 'CREATOR',
        accepted_terms: true
      });

      if (res.status < 200 || res.status >= 300) {
        if (development) {
          setErrors(res.data.detail)
        } else {
          setErrors('There was an error creating the demo user')
        }
        return
      }
      new_user = res.data;
    } catch (err) {
      setErrors(err.message);
      if (development) {
        console.log(err.message)
      }
    }

    const formData = new FormData();
    formData.append('profile_picture', creatorImage);

    try
    {
      const res = await usersAPILink.updateProfilePic(new_user._id, formData);
      if (res.status < 200 || res.status >= 300) {
        if (development) {
          setErrors(res.data.detail)
        } else {
          setErrors('There was an error adding profile picture')
        }
        return
      }
    } catch (err) {
      // setErrors(err.message);
      if (development) {
        console.log(err.message)
      }
    }

    let creator_id;
    
    try {
      const res = await usersAPILink.addCreator({
        user_id: new_user._id,
        description: creatorDescription,
        module_based_subscription: false,
        pricing: [],
        chat_name: creatorName + ' Chatbot', 
        tag_name: 'start-ups and entrepreneurship'
      });
      if (res.status < 200 || res.status >= 300) {
        if (development) {
          setErrors(res.data.detail)
        } else {
          setErrors('There was an error creating the creator account')
        }
        return
      }
      const creator = await res.data.data;
      creator_id = creator._id;
    } catch (err) {
      setErrors(err.message);
      if (development) {
        console.log(err.message)
      }
    }


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

      const moduleContentFormData = new FormData();
      moduleContentFormData.append('file', moduleContent);

      const res_2 = await demosAPI.generateDemo(module_id, moduleContentFormData);

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
          <h2 style={{marginBottom: 16}}>Creator Info</h2>
          <div className="global-form-group">
            <label htmlFor="creator-name">Creator Name</label>
            <input
              id="creator-name"
              type="text"
              value={creatorName} 
              onChange={(e) => setCreatorName(e.target.value)}
              required 
            />
          </div>

          <div className="global-form-group">
            <label htmlFor="creator-description">Creator Description</label>
            <textarea  
              className = "module-content"
              id="creator-desciption" 
              type="text" 
              value={creatorDescription} 
              onChange={(e) => setCreatorDescription(e.target.value)}
              required 
            />
          </div>

          <div className="global-form-group">
            <label htmlFor="creator-image">Creator Profile Picture</label>
            <input
              id="creator-image" 
              type="file" 
              accept=".jpg, .jpeg"
              onChange={handleFileChange}
              required 
            />
          </div>


          <h2 style={{marginBottom: 16}}>Module Info</h2>
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
            <input
              id="module-content" 
              type="file"
              accept=".txt"
              onChange={handleModuleContentChange}
              required 
            />
          </div>
          <div className="global-flex-form-button-container">
            <button type="submit" className="global-form-submit-button">
              {loading ? <BeatLoader  /> : 'Create Module'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreateDemo;