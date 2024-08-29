import { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import useLogContext from "hooks/useLogContext";
import questionsAPILink from "api_link/questions";


const ViewQuestion = ({ question }) =>
{
    const { development } = useLogContext();
    const [loading, setLoading] = useState(false);
    const [reviewStatus, setReviewStatus] = useState(null);
    const [questionReviewClicked, setQuestionReviewClicked] = useState(false);

    const [feedback, setFeedback] = useState('');

    const [questionReviewed, setQuestionReviewed] = useState(false);

    const handleReviewQuestion = (reviewStatus) =>
    {
        if(reviewStatus !== 'BAD') setBadReportOptionSelected(null);
        setReviewStatus(reviewStatus);
        setQuestionReviewClicked(true);
    }

    const badReportOptions = [
        'Question does not make sense',
        'The correct answer option is wrong',
        'Duplicate correct answer options',
        'Some answer options are unrelated to the question',
        'Hint is not helpful',
        'Hint gives away the answer',
        'Explanation is not correct',
        'Other'
    ];

    const [badReportOptionSelected, setBadReportOptionSelected] = useState('');


    const handleReviewQuestionSubmit = async () =>
    {
        if(badReportOptionSelected === 'Other' && feedback === '')
        {
            alert('Please add feedback for the bad rating option when selecting other');
            return;
        }

        if(reviewStatus === 'BAD' && badReportOptionSelected === null)
        {
            alert('Please select an option for the bad rating');
            return;
        }

        if(reviewStatus === null)
        {
            alert('Please select review status (Great, Good, OK, Bad)');
            return;
        }

        setLoading(true);
        console.log(reviewStatus, badReportOptionSelected, feedback);
        const res = await questionsAPILink.reviewQuestion(question._id, {
            rating: reviewStatus,
            report_reason: badReportOptionSelected,
            feedback: feedback
        });

        if(development)
        {
            console.log('Review Question Submitted');
            console.log('Response:', res);
        }

        if(res.status !== 204)
        {
            const res_errors = await res['data'];
            if(development) console.error(res_errors);
            alert('Error submitting review question');
            setLoading(false);
            return;
        }

        setLoading(false);
        setQuestionReviewed(true);
        setQuestionReviewClicked(false);
    }

    return (
        <>
        <div className='question-container'>
            <div className="question-text">
                <h3 className='question-text-title'>Question:</h3>
                <p className='question-text-question'>{question.question}</p>
            </div>
            <div className="answer-options">
                <h3 className='answer-options-title'>Answer Options (Correct option has a green background):</h3>
                <div className="answer-options-container">
                    {
                        (question.question_type === 'MCQ' || question.question_type === 'TRUE_FALSE') && Object.values(question.answers).map((answer, answerIndex) => {
                            if(answer === null) return;
                            return (
                                <div className={`answer-option ${answerIndex+1 === parseInt(question.correct_answer_number) ? 'correct-answer' : ''}`} key={answerIndex}>
                                    <span>{answer}</span>
                                </div>
                            )
                        })
                    }
                    {
                        question.question_type === 'FILL_BLANK' && question.options.map((option, optionIndex) => {
                            return (
                                <div className={`answer-option ${option === question.correct_answer ? 'correct-answer' : ''}`} key={optionIndex}>
                                    <span>{option}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="hint-info">
                <h3 className='hint-info-title'>Hint:</h3>
                <p className='hint-info-hint'>{question.hint}</p>
            </div>
            <div className="explanation-info">
                <h3 className='explanation-info-title'>Explanation:</h3>
                <p className='explanation-info-explanation'>{question.explanation}</p>
            </div>

            {
                !questionReviewed && (
                    <div className="review-question-container">
                        <h2 className='review-question-title'>Review Question</h2>
                        <div className="review-question-options">
                            <button className='review-question-option great' onClick={() => handleReviewQuestion('GREAT')}>
                                <span>Great</span>
                            </button>
                            <button className='review-question-option good' onClick={() => handleReviewQuestion('GOOD')}>
                                <span>Good</span>
                            </button>
                            <button className='review-question-option ok' onClick={() => handleReviewQuestion('OK')}>
                                <span>OK</span>
                            </button>
                            <button className='review-question-option bad' onClick={() => handleReviewQuestion('BAD')}>
                                <span>Bad</span>
                            </button>
                        </div>
                    </div>
                )
            }
        </div>

        {
            questionReviewClicked && (
                <div className="review-question-modal">
                    <h2 className='review-question-modal-title'>Review Question</h2>
                    <p className='review-question-modal-status'><b>Rating Selected:</b> {reviewStatus}</p>

                    {
                        reviewStatus === 'BAD' && (
                            <div className="review-question-modal-bad-rating-options">
                                <h4>Bad Rating Options</h4>
                                <CheckboxGroup
                                    options={badReportOptions}
                                    selectedOption={badReportOptionSelected}
                                    setSelectedOption={setBadReportOptionSelected}
                                />
                            </div>
                        )
                    }

                    <textarea className='review-question-modal-comment' placeholder='Add feedback...' onChange={(e) => setFeedback(e.target.value)}></textarea>

                    <button className='review-question-modal-submit' onClick={handleReviewQuestionSubmit}>Submit</button>
                </div>
            )
        }
        </>
    )
}
export default ViewQuestion;
