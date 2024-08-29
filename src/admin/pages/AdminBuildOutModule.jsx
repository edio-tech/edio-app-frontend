// React / React Library imports
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Context imports
import useLogContext from "hooks/useLogContext";

// Component imports
import AdminBuildOutBook from "admin/components/AdminBuildOutBook";
import AdminBuildOutPDF from "admin/components/AdminBuildOutPDF";

// Hook imports
import useAdminNavbar from "hooks/useAdminNavbar";

// Styling
import "styles/admin/adminbuildoutmodule.css";

const AdminBuildOutModule = () => {
  const { creator_id, module_id } = useParams();
  const { development } = useLogContext();
  const navigate = useNavigate();

  const [documentType, setDocumentType] = useState("");

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    if (documentType == "") {
      setLeftName("Module Build Out Options");
      setLeftAction(() => () => navigate(`/admin/module/${creator_id}/${module_id}`));
      setTitleName("Document Type");
      setRightName("");
      setRightAction(null);
    } else if (documentType == "book") {
      setLeftName("Select Document Type");
      setLeftAction(() => () => setDocumentType(""));
      setTitleName("Upload Book PDF");
    } else if (documentType == "other") {
      setLeftName("Select Document Type");
      setLeftAction(() => () => setDocumentType(""));
      setTitleName("Upload any PDF");
    }
  }, [documentType]);

  return (
    <div className="flex-container-col-no-scroll">
      {documentType == "" && (
        <>
          <div className="flex-container-document-buttons">
            <button className="global-button large-document-type-button" onClick={() => setDocumentType("book")}>
              {" "}
              BOOK{" "}
            </button>
            <button className="global-button large-document-type-button" onClick={() => setDocumentType("other")}>
              {" "}
              OTHER{" "}
            </button>
          </div>
        </>
      )}
      {documentType == "book" && <AdminBuildOutBook module_id={module_id} creator_id={creator_id} />}
      {documentType == "other" && <AdminBuildOutPDF module_id={module_id} creator_id={creator_id} />}
    </div>
  );
};

export default AdminBuildOutModule;
