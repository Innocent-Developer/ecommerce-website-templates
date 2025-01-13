import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [create, setCreate] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreate({ ...create, [name]: value });
  };

  const validateForm = () => {
    if (!create.fullName.trim()) return 'Full Name is required.';
    if (!create.username.trim()) return 'Username is required.';
    if (!create.email.includes('@')) return 'Invalid email address.';
    if (create.password.length < 8) return 'Password must be at least 8 characters.';
    return '';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/account/signup`,
        create
      );
      toast.success('Signup Successful');
    console.log(response.data);
      setCreate({ fullName: '', username: '', email: '', password: '' });
      navigate('/account/login');
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSignup}>
        <p className="form-title">Create a New Account</p>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={create.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            value={create.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={create.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            value={create.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
        <p className="signup-link">
          Already have an account? <NavLink to="/account/login">Log in</NavLink>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;

  .form {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    max-width: 100%;
    width: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .form-title {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
    text-align: center;
    color: #000;
    margin-bottom: 1rem;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .input-container {
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
  }

  .input-container label {
    display: block;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
    color: #6b7280;
  }

  .input-container input {
    width: 100%;
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .submit {
    display: block;
    width: 100%;
    padding: 0.75rem 1.25rem;
    background-color: #4f46e5;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .submit:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  .submit:hover:not(:disabled) {
    background-color: #4338ca;
  }

  .signup-link {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    margin-top: 1rem;
  }

  .signup-link NavLink {
    color: #4f46e5;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .form {
      width: 100%;
      padding: 1rem;
    }

    .input-container input {
      font-size: 0.75rem;
      padding: 0.875rem;
    }

    .form-title {
      font-size: 1.25rem;
    }

    .submit {
      font-size: 0.75rem;
    }
  }
`;

export default CreateAccount;
