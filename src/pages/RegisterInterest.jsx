import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogContext from 'hooks/useLogContext';

import '../styles/pages/registerinterest.css';

const RegisterInterest = () =>
{
    const { development } = useLogContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);
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
                        <label htmlFor="occupation">Occupation/Role*:</label>
                        <input type="text" id="occupation" name="ocupation" required />
                </div>
                <div className="global-form-group">
                    <label htmlFor="extra-info">Extra Information:</label>
                    <textarea id="extra-info" name="extra-info" required />
                </div>

                <div className = "global-form-button-group">
                        <button type="submit" className="global-form-submit-button global-button" disabled={loading}>
                            {loading ? <BeatLoader /> : 'Submit'}
                        </button>
                </div>
                </form>
            </div>
        </div>
    )
}
export default RegisterInterest;
