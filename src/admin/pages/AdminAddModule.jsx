// React imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Components imports
import { AddModule, AddSubTag } from "components";

// Styling imports
import "styles/admin/adminaddmodule.css";

const AdminAddModule = () => {
  const { creator_id } = useParams();

  const navigate = useNavigate();

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  const [hash, setHash] = useState(location.hash);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (hash === "") {
      setLeftName("All Modules");
      setLeftAction(() => () => navigate(`/admin/all-modules/${creator_id}`));
      setTitleName("Add Module");
      setRightName("");
      setRightAction(null);
    } else if (hash === "#add-sub-tag") {
      setLeftName("Add Module");
      setLeftAction(() => () => {
        setHash("");
      });
      setTitleName("Add Sub-Tag");
      setRefetch(true);
    } else if (hash === "#add-tag") {
      setLeftName("Add Sub-Tag");
      setLeftAction(() => () => {
        setHash("#add-sub-tag");
      });
      setTitleName("Add Tag");
      setRefetch(true);
    }
  }, [hash]);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    setHash(location.hash);
  }, [location.hash]);

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [selectedSubTag, setSelectedSubTag] = useState("");

  return (
    <div className="flex-container-col">
      <div className="flex-page-contents">
        {hash === "" && (
          <AddModule
            creator_id={creator_id}
            refetch={refetch}
            setRefetch={setRefetch}
            setHash={setHash}
            hash={hash}
            moduleTitle={moduleTitle}
            setModuleTitle={setModuleTitle}
            moduleDescription={moduleDescription}
            setModuleDescription={setModuleDescription}
            selectedSubTag={selectedSubTag}
            setSelectedSubTag={setSelectedSubTag}
            setLeftName={setLeftName}
            setLeftAction={setLeftAction}
            setTitleName={setTitleName}
          />
        )}
        {hash === "#add-sub-tag" && <AddSubTag hash={hash} setHash={setHash} refetch={refetch} setRefetch={setRefetch} setLeftName={setLeftName} setLeftAction={setLeftAction} setTitleName={setTitleName} />}
      </div>
    </div>
  );
};

export default AdminAddModule;
