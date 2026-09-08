import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './InputField.css';

const InputField = ({ label, type, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="input-wrapper">
      <div className="custom-input-box">
        <label className="input-label">{label}</label>
        <div className="input-row">
          <input
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            name={name}
            value={value}
            onChange={onChange}
            className="styled-input"
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-pwd-btn"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;