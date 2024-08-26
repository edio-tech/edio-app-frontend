import { useState } from "react";
import { ArrowDown, ArrowRight, Pencil } from 'lucide-react';

import "styles/components/moduledisplay.css";


const ModuleStructureDisplay = ( {handleSectionSelection, currentModuleData, edittingModule} ) => {

   const [collapsedParts, setCollapsedParts] = useState({});
   const [collapsedChapters, setCollapsedChapters] = useState({});

   const toggleCollapse = (stateUpdater, id) => {
      stateUpdater(prev => ({ ...prev, [id]: !prev[id] }));
   };

   const handleAddPartClick = () => { Navigate(``)}

   return (
      <>
      { edittingModule &&
      <div>
         <button className="global-button global-trans-button add-part-header"><h3 className="part-header">Add Part</h3></button>
      </div>
      }
      {Object.values(currentModuleData.parts).map(part => (
         <div key={part._id}>
            <div className="part-header">
            <div className = "collapse-button">
               <button onClick={() => toggleCollapse(setCollapsedParts, part._id)} className="global-button global-trans-button white-button">
                  {collapsedParts[part._id] ? <ArrowRight /> : <ArrowDown />}
               </button>
            </div>
            <h3>{part.part_name}</h3>
            </div>
            { edittingModule &&
               <button className="global-button global-trans-button add-chapter-header"><h4 className="chapter-header">Add Chapter</h4></button>
            }
            {!collapsedParts[part._id] && Object.values(part.chapters).map(chapter => (
            <div key={chapter._id} className="chapter-container">
               <div className="chapter-header">
                  <div className = "collapse-button">
                  <button onClick={() => toggleCollapse(setCollapsedChapters, chapter._id)} className="global-button global-trans-button white-button">
                     {collapsedChapters[chapter._id] ? <ArrowRight /> : <ArrowDown />}
                  </button>
                  </div>
                  <h4>{chapter.chapter_name}</h4>
               </div>
               { edittingModule &&
               <button className="global-button global-trans-button add-section-header"><h5 className="section-header">Add Section</h5></button>
               }
               {!collapsedChapters[chapter._id] && Object.values(chapter.sections).map(section => (
                  <div key={section._id} className="section-container">
                  <div className="section-header">
                     <button onClick={() => handleSectionSelection(section._id)} className="global-button global-trans-button white-button">
                        <h5>{section.section_name}</h5>
                     </button>
                  </div>
                  </div>
               ))}
            </div>
            ))}
         </div>
      ))}
      </>
   )

}

export default ModuleStructureDisplay