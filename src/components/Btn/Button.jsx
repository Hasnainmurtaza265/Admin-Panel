import React from 'react';
import './Button.css';

const Button = ({ children, type = 'button', onClick }) => {
    return (
        <button type={type} onClick={onClick} className="primary-btn">
            {children}
        </button>
    );
};

export default Button;