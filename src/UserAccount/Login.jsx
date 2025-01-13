import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://ecommerce-website-backend-t217.onrender.com/account/login',
        login
      );
      console.log('Login Successful:');
      setError(`Login Successful`);
      const { data } = response;
      console.log('Login Data:', data.data.id);
      toast.success('Login Successful');
      navigate(`/home/${data.data.id}`);
    } catch (err) {
      setError(err?.data?.message || 'Something went wrong. Please try again.');
      console.error('Login Error:', err);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleLogin}>
        <p className="form-title">Sign in to your account</p>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={login.email}
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
            placeholder="Enter password"
            value={login.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        <p className="signup-link">
          No account? <NavLink to={"/account/create-account"}>Sign up</NavLink>
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

export default Login;
