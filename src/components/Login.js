
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://test.e-prathibha.com/apis/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
      .then(response => {
        console.log('Login response:', response);
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        console.log('Login data:', data);
        // Store the ID and token in local storage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        navigate('/FreeExam');
      })
      .catch(error => {
        console.error('Error sending login request:', error);
        setError('Please enter the password correctly.');
        alert('An error occurred while logging in. Please try again later.');
      });
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="login-error">{error}</p>}
        </div>

        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
