import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/registerinterest.css';
import useLogContext from 'hooks/useLogContext';
import usersAPILink from 'api_link/users';
import { BeatLoader } from 'react-spinners';

const RegisterInterest = () =>
{
    const { development } = useLogContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading(true);

        const data = Object.fromEntries(new FormData(e.currentTarget));

        console.log(data);

        const res = await usersAPILink.registerInterest(data);
        if(development)
        {
            console.log('REGISTER INTEREST RESPONSE', res);
        }
        if(res['status'] !== 201)
        {
            let errors = await res['data'];
            if(development) console.error(errors);
            setErrors(errors);
            setLoading(false);
            return;
        }
        if(development) console.log('REGISTER INTEREST SUCCESS');
        setLoading(false);
        alert('Thank you for your interest in joining us! We will get back to you soon.');
        navigate('/');
    }

    return (
        <div className="flex-container">
            <div className="flex-form-container">
                { errors && <div className = "error-message"> { errors.detail } </div>}
                <form onSubmit={handleSubmit} className="global-form">
                <div className="global-form-group">
                        <label htmlFor="email">Contact Email*:</label>
                        <input type="email" id="email" name="email" required />
                </div>
                <div className="global-form-group">
                        <label htmlFor="name">Name*:</label>
                        <input type="text" id="name" name="name" required />
                </div>
                <div className="global-form-group">
                        <label htmlFor="occupation">Occupation/Role*:</label>
                        <input type="text" id="occupation" name="occupation" required />
                </div>
                <div className="global-form-group">
                    <label htmlFor="extra-info">Extra Information:</label>
                    <textarea id="extra-info" name="extra_info" />
                </div>

                <div className = "global-form-button-group">
                        <button type="submit" className="global-form-submit-button global-button" disabled={loading}>
                            {loading ? <BeatLoader color="#fff" /> : 'Submit'}
                        </button>
                </div>
                </form>
            </div>
        </div>
    )
}
export default RegisterInterest;
