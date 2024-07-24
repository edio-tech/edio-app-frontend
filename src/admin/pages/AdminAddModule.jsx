// React imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Components imports
import { AddModule, AddTag } from "components";

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

  return (
    <div className = "flex-container-col">
      <div className = "flex-page-contents">
      { hash === '' &&
        <AddModule creator_id = { creator_id } hash = { hash } setHash = { setHash }/>
      }
      { hash === '#add-tag' && <AddTag setHash = { setHash } /> }
      </div>
    </div>
  )
};

export default AdminAddModule;