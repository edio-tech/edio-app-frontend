// React imports
import { useNavigate, useParams } from "react-router-dom";

// Components imports
import { AddModule } from "components";

// Styling imports
import "styles/admin/adminaddmodule.css"

const AdminAddModule = () => {

  const { creator_id } = useParams();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/admin/all-modules/${creator_id}`)
  }
  return (
    <div className = "flex-container-col">
      <div className="flex-top-bar">
        <div>
          <button className="global-button global-trans-button" onClick={() => handleBackClick()}> BACK </button>
        </div>
      </div>
      <div className = "flex-page-contents">
        <AddModule creator_id = { creator_id }/>
      </div>
    </div>
  )
};

export default AdminAddModule;