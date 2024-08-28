import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

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

    // useEffect(() => {
    //     fetchAllPokerQuestions();
    // }, []);

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
                </div>
            }

            {
                Object.keys(questions).length > 0 && (
                    <div className='questions-container'>
                        {Object.entries(questions).map(([book, chapters], bookIndex) => (
                            <div className='book-container' key={bookIndex}>
                                <button className='book-title' onClick={() => toggleBook(book)}>
                                    {book}
                                </button>
                                {expandedBook === book && (
                                    <div className='chapters-container'>
                                        {Object.entries(chapters).map(([chapter, chapterQuestions], chapterIndex) => (
                                            <div className='chapter-container' key={chapterIndex}>
                                                <button className='chapter-title' onClick={() => toggleChapter(chapter)}>
                                                    {chapter}
                                                </button>
                                                {expandedChapter === chapter && (
                                                    <div className='questions-list'>
                                                        {chapterQuestions.map((question, questionIndex) => (
                                                            <div className='question-container' key={questionIndex}>
                                                                {question.question}
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
