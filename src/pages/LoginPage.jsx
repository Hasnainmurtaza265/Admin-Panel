import React from 'react';
import LoginForm from '../components/loginForm/LoginForm';
import SocialBtn from '../components/Btn/SocialBtn/SocialBtn.jsx'; // 'btn' ki jagah 'Btn'
import { Settings } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <button className="settings-fab" title="Settings">
        <Settings size={20} />
      </button>

      <div className="main-content">
        <LoginForm />

        <div className="auth-providers-grid">
          <SocialBtn icon="🔥" label="Firebase" />
          <SocialBtn icon="🛡️" label="Auth0" />
          <SocialBtn icon="aws" label="AWS" />
          <SocialBtn icon="⚡" label="Supabase" />
        </div>
      </div>

      <footer className="footer-container">
        <a
          href="https://berrydashboard.com"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          berrydashboard.com
        </a>
        <a
          href="https://codedthemes.com"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          © codedthemes.com
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;