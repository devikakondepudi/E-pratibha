
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyEmail.css';

function VerifyEmail() {
  const [regCode, setRegCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifyEmail = async (reg_code) => {
      const formData = new FormData();
      formData.append('reg_code', reg_code);

      try {
        const response = await fetch("https://test.e-prathibha.com/apis/verifyEmail", {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Email verification successful!');
          console.log(response);
          navigate("/Login");
        } else {
          throw new Error('Email verification failed');
        }
      } catch (error) {
        console.error('Email verification failed:', error);
      }
    };

    const regCodeRegex = /^[A-Z0-9]{6}$/;
    if (!regCodeRegex.test(regCode)) {
      setError('Please enter the registration code correctly.');
      return;
    }

    verifyEmail(regCode);
  };

  return (
    <div className="verifyemail-container">
      <h1>Verify Email</h1>
      <form className="verifyemail-form" onSubmit={handleSubmit}>
        <label className="verifyemail-label" htmlFor="regCode">Registration Code</label>
        <input className="verifyemail-input" type="text" id="regCode" value={regCode} onChange={(e) => setRegCode(e.target.value)} required />

        {error && <p className="verifyemail-error">{error}</p>}

        <button className="verifyemail-button" type="submit">Verify Email</button>
      </form>
    </div>
  );
}

export default VerifyEmail;
