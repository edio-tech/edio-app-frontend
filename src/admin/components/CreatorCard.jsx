
import "styles/admin/creatorcard.css";

const CreatorCard = ({ name, image }) => {
   return (
      <div className = "flex-card-container">
         <div className = "card-name">
            { name }
         </div>
         <img src={image} alt={`${name}'s profile`} className = "card-image" />
      </div>
   )
}

export default CreatorCard;