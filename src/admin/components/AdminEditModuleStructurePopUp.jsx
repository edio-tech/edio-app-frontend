import React, { useState } from "react";

const AdminEditModuleStructurePopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="popup-container">
      <button onClick={togglePopup} className="toggle-button">
        Toggle Popup
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Full-screen Popup</h2>
            <p>This is the content of your full-screen popup.</p>
            <button onClick={togglePopup} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEditModuleStructurePopUp;
