import React from 'react';
import './SocialBtn.css';

const SocialBtn = ({ icon, label, onClick }) => {
    return (
        <button type="button" onClick={onClick} className="provider-btn">
            <span className="btn-icon">{icon}</span>
            <span>{label}</span>
        </button>
    );
};

export default SocialBtn;