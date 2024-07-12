// React imports
import { useParams } from "react-router-dom";

// Components imports
import { AddModule } from "components";



const AdminAddModule = () => {

   const { creator_id } = useParams();


  return (
    <div className = "flex-container">
      <AddModule 
         creator_id = { creator_id }/>
   </div>
  )
};

export default AdminAddModule;