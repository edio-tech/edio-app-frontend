


import "styles/admin/components/displayquestions.css";

const DisplayQuestions = ({SectionData}) => {
  return (
   <div className="flex-questions-container">
   {Object.values(SectionData.goals).some(goal => goal.questions && goal.questions.length > 0) ? (
      <>
        {Object.entries(SectionData.goals).map(([goalId, goal], goalIndex) => (
          <div key={goalId} className="goal-questions-container">
            <h4>Goal {goalIndex + 1}: {goal.summary} ({goalId})</h4>
            {goal.questions && goal.questions.length > 0 ? (
              <div className="questions-list">
                {goal.questions.map((question, index) => (
                  <div key={question._id} className="question-item">
                    <h5>Question {index + 1} ({question._id})</h5>
                    <p>{question.question}</p>
                    {question.question_type === "MCQ" ? (
                      <div className="mcq-options">
                        {Object.entries(question.answers).map(([key, value]) => (
                          <div key={key} className="mcq-option">
                            <div 
                              type="radio" 
                              id={`${question._id}-${key}`} 
                              name={question._id} 
                              value={key}
                              disabled
                            />
                            {key === question.correct_answer_number ? ( <strong><label htmlFor={`${question._id}-${key}`}>{value}</label></strong>
                            ) : (
                              <label htmlFor={`${question._id}-${key}`}>{value}</label>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : question.question_type === "TRUE_FALSE" ? (
                      <div className="mcq-options">
                        {Object.entries(question.answers).map(([key, value]) => (
                          <div key={key} className="mcq-option">
                            <div 
                              type="radio" 
                              id={`${question._id}-${key}`} 
                              name={question._id} 
                              value={key}
                              disabled
                            />
                            {key === question.correct_answer_number && <strong><label htmlFor={`${question._id}-${key}`}>{value}</label></strong>}
                          </div>
                        ))}
                      </div>
                    ) : question.question_type === "FILL_BLANK" ? (   
                      <> 
                      <div className="fill-blank-options">
                        <p><strong>Options</strong>: {question.options.join(", ")}</p>
                      </div>
                      <div><strong> Correct Option: {question.correct_answer}</strong></div>
                      </>
                    ) : null}
                    <p style={{marginTop: "10px"}}><strong>Question Type:</strong> {question.question_type}</p>
                    <p><strong>Method Number:</strong> {question.pipeline_number}</p>
                    <p><strong>Difficulty:</strong> {question.difficulty}</p>
                    <p><strong>Hint:</strong> {question.hint}</p>
                    <p><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No questions available for this goal.</p>
            )}
          </div>
        ))}
      </>
    ) : (
      <p>No goals available for this section.</p>
    )}
   </div>
  )
}

export default DisplayQuestions