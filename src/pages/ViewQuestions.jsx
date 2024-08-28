import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { ChevronRight, ChevronDown } from 'lucide-react';

import questionsAPILink from 'api_link/questions';
import '../styles/pages/viewquestions.css';
import useLogContext from 'hooks/useLogContext';
import edioAnimation from '../assets/edio-loading.json';

const ViewQuestions = () =>
{

    const { development } = useLogContext();

    const [questions, setQuestions] = useState({});
    
    const [questionsLoading, setQuestionsLoading] = useState(false);

    const fetchAllPokerQuestions = async () =>
    {
        setQuestionsLoading(true);
        const res = await questionsAPILink.getAllQuestionsFromCreator('666853a17f50b564b88d81ab');

        if(development)
        {
            console.log('GET ALL POKER QUESTIONS RESPONSE: ', res);
        }

        if(res['status'] !== 200)
        {
            const res_errors = res['data'];
            if(development) console.error(res_errors);
            setQuestionsLoading(false);
            return;
        }

        const all_questions = res['data'];
        setQuestions(all_questions);
        setQuestionsLoading(false);
    }

    useEffect(() => {
        fetchAllPokerQuestions();
    }, []);

    const [expandedBook, setExpandedBook] = useState(null);
    const [expandedChapter, setExpandedChapter] = useState(null);

    const toggleBook = (book) =>
    {
        setExpandedBook(expandedBook === book ? null : book);
        setExpandedChapter(null);
    };

    const toggleChapter = (chapter) =>
    {
        setExpandedChapter(expandedChapter === chapter ? null : chapter);
    };

    return (
        <div className='view-questions-container'>
            <div className="title-and-disclaimer">
                <h1 className='view-questions-title'>View Dara's Poker Questions</h1>
                <p className='view-questions-disclaimer'>Below is the list of Dara's books, clicking on a book title will show the list of chapters in that book. Clicking on a chapter title will show the list of questions in that chapter.</p>
            </div>

            {
                questionsLoading && <div className='loading-container'>
                    <Lottie animationData={edioAnimation} autoPlay loop />
                    <span>Loading... (Can take up to 30 seconds)</span>
                </div>
            }

            {
                Object.keys(questions).length > 0 && !questionsLoading && (
                    <div className='questions-container'>
                        {Object.entries(questions).map(([book, chapters], bookIndex) => (
                            <div className='book-container' key={bookIndex}>
                                <button className='book-title' onClick={() => toggleBook(book)}>
                                    <span>{bookIndex + 1}. {book}</span>
                                    {expandedBook === book ? <ChevronDown size={40} /> : <ChevronRight size={40} />}
                                </button>
                                {expandedBook === book && (
                                    <div className='chapters-container'>
                                        {Object.entries(chapters).map(([chapter, chapterQuestions], chapterIndex) => (
                                            <div className='chapter-container' key={chapterIndex}>
                                                <button className='chapter-title' onClick={() => toggleChapter(chapter)}>
                                                    <span>{chapterIndex + 1}. {chapter}</span>
                                                    {expandedChapter === chapter ? <ChevronDown size={32} /> : <ChevronRight size={32} />}
                                                </button>
                                                {expandedChapter === chapter && (
                                                    <div className='questions-list'>
                                                        {chapterQuestions.map((question, questionIndex) => (
                                                            <div className='question-container' key={questionIndex}>
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


                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
export default ViewQuestions;
