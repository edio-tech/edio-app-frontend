import { useState } from "react";
import { useParams } from "react-router-dom";

// Component imports
import { Spinner, ErrorMessage } from "components";

// Context imports
import useLogContext from "hooks/useLogContext";

// API imports
import moduleGenerationAPI from "api_link/module_generation.js";

const AdminBuildOutPDF = () => {
  const { development } = useLogContext();
  const { module_id } = useParams();

  const [isStructured, setIsStructured] = useState(false);
  const [sectionNames, setSectionNames] = useState("");
  const [returnedContent, setReturnedContent] = useState(null);

  const [errors, setErrors] = useState(null);

  // File uploading
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileErrors, setFileErrors] = useState(null);
  const [conversionLoading, setConversionLoading] = useState(false);

  // File Uploading
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      console.log("You must upload a file!");
      setFileErrors("You must upload a file!");
      return;
    }
    setFileErrors(null);
    if (isStructured && sectionNames.length === 0) {
      setErrors("You must enter section labels if you want the pdf processed as structured data!");
      return;
    }
    setConversionLoading(true);

    const formData = new FormData();
    formData.append("uploaded_file", selectedFile);

    if (isStructured) {
      const bodyData = {
        sections_label: sectionNames,
      };
      formData.append("body", JSON.stringify(bodyData));
    }

    try {
      let res;
      if (isStructured) {
        res = await moduleGenerationAPI.convertPdfToMarkdownLLMStructured(module_id, formData);
      } else {
        res = await moduleGenerationAPI.convertPdfToMarkdownLLMUnstructured(module_id, formData);
      }
      if (res.status < 200 || res.status >= 300) {
        if (development) {
          console.log(res.data.detail);
        }
        console.log(`An error occurred when converting the PDF to markdown. Status: ${res.status}`);
        throw new Error("Unable to convert the PDF to markdown");
      }
      setReturnedContent(res.data);
    } catch (err) {
      setErrors(err);
      if (development) {
        console.log("error:", err);
      }
      return;
    } finally {
      setConversionLoading(false);
    }
  };

  return (
    <>
      {!returnedContent && (
        <form onSubmit={handleSubmit} className="flex-upload-pdf-form-box">
          <div className="flex-form-group">
            <label htmlFor="is-structured">
              <input type="checkbox" id="is-structured" onChange={(e) => setIsStructured(e.target.checked)} checked={isStructured} />
              Is the content structured?
            </label>
          </div>
          {isStructured && (
            <div className="flex-form-group">
              <label htmlFor="section-names">Section Labels:</label>
              <input type="text" id="section-names" value={sectionNames} onChange={(e) => setSectionNames(e.target.value)} placeholder="e.g. Chapters, Lectures, etc" />
            </div>
          )}
          <h4> Please Upload your PDF File below. It may take a few minutes to process.</h4>
          <div className="flex-upload-box">
            <input type="file" id="file-upload" accept=".pdf" className="global-button" onChange={handleFileChange} />
            {!conversionLoading && (
              <button type="submit" className="global-button">
                {" "}
                Upload File{" "}
              </button>
            )}
            {conversionLoading && (
              <div>
                {" "}
                <Spinner />
              </div>
            )}
          </div>
          {errors && (
            <div className="error-message">
              <ErrorMessage>{errors.detail}</ErrorMessage>
            </div>
          )}
          {fileErrors && <div className="error-message">{fileErrors}</div>}
        </form>
      )}
    </>
  );
};

export default AdminBuildOutPDF;
