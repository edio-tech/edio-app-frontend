import { useNavigate, useParams } from "react-router-dom";

const AdminModule = () => {

  const { creator_id, module_id } = useParams();
  const navigate = useNavigate();

  // Need to add if no parts -> Provide 'Build out Module Automatically Button'
  // This links to upload PDF page. Get this to return the Markdown and see how it can be displayed.
  
  const handleBackClick = () => {
    navigate(`/admin/all-modules/${creator_id}`)
  }

  const handleAddPartClick = () => {
    //navigate(`/admin/add-module/${creator_id}`)
  }

  const handleBuildOutClick = () => {
    navigate(`/admin/build-out-module/${creator_id}/${module_id}`)
  }

  return (
    <div className = "flex-container-col">
      <div className="flex-top-bar">
        <div className="flex-bar-left">
          <div className="top-bar-item">
            <button className="global-button global-trans-button" onClick={() => handleBackClick()}> BACK </button>
          </div>
        </div>
        <div className="flex-bar-right">
          <div className="top-bar-item">
            <button className="global-button global-trans-button" onClick={() => handleAddPartClick()}> ADD PART </button>
          </div>
        </div>
      </div>
      <div className = "flex-content">
        <button onClick={() => handleBuildOutClick()} className="global-button">BUILD OUT MODULE</button>
      </div>
    </div>  
  )
};

export default AdminModule;