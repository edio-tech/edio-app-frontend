import "styles/components/featurecard.css"

const FeatureCard = ({ icon, title, description }) => {
   return (
     <div className="feature-card global-grow">
       <div className="feature-icon">{icon}</div>
       <h4>{title}</h4>
       <p>{description}</p>
     </div>
   );
 };

 export default FeatureCard;