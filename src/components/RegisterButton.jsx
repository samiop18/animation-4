import React from 'react';
import './RegisterButton.css';

const RegisterButton = ({ onClick }) => {
    return (
        <div className="register-button-wrapper">
            <button type="button" className="btn" onClick={onClick}>
                <strong>REGISTER HERE</strong>
                <div id="container-stars">
                    <div id="stars" />
                </div>
                <div id="glow">
                    <div className="circle" />
                    <div className="circle" />
                </div>
            </button>
        </div>
    );
}

export default RegisterButton;
