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

  const [hash, setHash] = useState(location.hash);

  useEffect(() => {
    if ( hash === '' ) {
      setLeftName('All Modules');
      setLeftAction(() => () => navigate(`/admin/all-modules/${creator_id}`));
      setTitleName('Add Module');
      setRightName('');
      setRightAction(null);
    } else if ( hash === '#add-tag' ) {
      setLeftName('Add Module')
      setLeftAction(() => () => {
        navigate('', { replace : true });
        setHash('');
      })
        setTitleName('Add Tag')
      setRightName('');
      setRightAction(null);
    }
  }, [hash])


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

  useEffect(() => {
    setHash(location.hash);
  }, [location.hash]);

  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <div className = "flex-container-col">
      <div className = "flex-page-contents">
      { hash === '' &&
        <AddModule 
        creator_id = { creator_id } 
        hash = { hash }
        moduleTitle={moduleTitle}
        setModuleTitle={setModuleTitle}
        moduleDescription={moduleDescription}
        setModuleDescription={setModuleDescription}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        />
      }
      { hash === '#add-tag' && <AddTag setHash = { setHash } />}
      </div>
    </div>
  )
};

export default AdminAddModule;