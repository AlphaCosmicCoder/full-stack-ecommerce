import React, { useEffect, useState } from 'react';
import './AuthForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate('/');
    }
  }, [])

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = 'http://localhost:4000/api/auth';
    let endpoint = '/login'; // Default to login endpoint

    if (!isLogin) {
      endpoint = '/register';
    }

    try {
      const response = await fetch(baseUrl + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (endpoint === '/register') {
        toast.success("Registration successfull!!")
        console.log(data);
      } else {
        console.log(data)
        toast.success("Login successfull!!")
        localStorage.setItem('auth', data.token)
        localStorage.setItem('admin', data.user.isAdmin)
        navigate('/');
      }// Handle response data as needed
    } catch (error) {
      toast.error("Invalid Credentials!!")
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-container">
      <div className="auth-form-container">
        <h2 className="auth-form-title">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-form-field">
              <label className="auth-form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="username"
                className="auth-form-input"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="auth-form-field">
            <label className="auth-form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form-field">
            <label className="auth-form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="auth-form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form-buttons">
            <button
              type="submit"
              className="auth-form-submit"
            >
              {isLogin ? 'Sign In' : 'Register'}
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="auth-form-toggle"
            >
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
