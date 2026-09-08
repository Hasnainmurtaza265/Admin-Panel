import React, { useState } from 'react';
import InputField from '../Input/InputField.jsx';
import Button from '../Btn/Button.jsx';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: 'info@codedthemes.com',
        password: '123456',
        rememberMe: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
    };

    return (
        <div className="login-card">
            <div className="card-header">
                <div className="logo-wrapper">
                    <div className="logo-badge">🫐</div>
                    <span className="brand-title">BERRY</span>
                </div>
                <h2 className="welcome-text">Hi, Welcome Back</h2>
                <p className="subtitle">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit}>
                <InputField
                    label="Email Address / Username"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <div className="form-options">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="checkbox-input"
                        />
                        Keep me logged in
                    </label>

                    <a href="#forgot" className="forgot-link">
                        Forgot Password?
                    </a>
                </div>

                <Button type="submit">Sign In</Button>

                <p className="signup-prompt">
                    Don't have an account? <a href="#signup" className="signup-link">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;