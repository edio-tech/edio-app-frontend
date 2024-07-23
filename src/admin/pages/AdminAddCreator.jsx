// React imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

const AdminAddCreator = () => {

   const navigate = useNavigate();

   const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

   useEffect(() => {
      setLeftName('All Creators');
      setLeftAction(() => () => navigate('/admin/all-creators'));
      setTitleName('Add Creator');
      setRightName('');
      setRightAction(null);
   }, [])

  return (
    <div className = "flex-container">Will add functionality to add a Creator soon.</div>
  )
}

export default AdminAddCreator