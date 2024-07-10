import { useParams } from "react-router-dom"


const AdminModules = () => {

   const { creator_id } = useParams();

  return (
    <div>AdminModules</div>
  )
}

export default AdminModules