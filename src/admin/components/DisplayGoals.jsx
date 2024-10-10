import ReactMarkdown from 'react-markdown';


const DisplayGoals = ({ goals }) => {
  return (
   <div className="goals-container">
   <h3>Goals</h3>
   {Object.entries(goals).map(([key, goal]) => (
     <div key={key} className="goal-item">
       <h4>Goal {key}</h4>
       <p><strong>Summary:</strong> {goal.summary}</p>
       <p><strong>Detail:</strong> {goal.detail}</p>
       <div className="display-content">
         <strong>Display Content:</strong>
         <ReactMarkdown>{goal.display_content}</ReactMarkdown>
       </div>
     </div>
   ))}
 </div>
  )
}

export default DisplayGoals