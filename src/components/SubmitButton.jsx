import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ onClick }) => {
    return (
        <div className="submit-btn-wrapper">
            <button className="submit-button" onClick={onClick} type="submit">
                <div className="dots_border" />
                <span className="text_button">SUBMIT</span>
            </button>
        </div>
    );
}

export default SubmitButton;
