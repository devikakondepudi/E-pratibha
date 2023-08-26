
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('phone', phone);
    if (photo) {
      formData.append('photo', photo);
    }
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    try {
      const response = await fetch('https://test.e-prathibha.com/apis/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        navigate('/verifyEmail'); // Navigate to '/verifyEmail' page
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="registration-container">
      <h1>Registration Page</h1>
      {error && <p className="registration-error">{error}</p>}
      <form className="registration-form" onSubmit={handleSubmit}>
        <label className="registration-label">Email</label>
        <input
          className="registration-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="registration-label">Name</label>
        <input
          className="registration-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="registration-label">Phone</label>
        <input
          className="registration-input"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="registration-label">Photo</label>
        <input
          className="registration-input"
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <label className="registration-label">Password</label>
        <input
          className="registration-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="registration-label">Confirm Password</label>
        <input
          className="registration-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="registration-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
