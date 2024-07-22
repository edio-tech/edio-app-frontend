// React imports
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Components imports
import { AddModule } from "components";

// Styling imports
import "styles/admin/adminaddmodule.css"

const AdminAddModule = () => {

  const { creator_id } = useParams();

  const navigate = useNavigate();

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    setLeftName('All Modules');
    setLeftAction(() => () => navigate(`/admin/all-modules/${creator_id}`));
    setTitleName('Add Module');
    setRightName('');
    setRightAction(null);
  }, [])

  return (
    <div className = "flex-container-col">
      <div className = "flex-page-contents">
        <AddModule creator_id = { creator_id }/>
      </div>
    </div>
  )
};

export default AdminAddModule;