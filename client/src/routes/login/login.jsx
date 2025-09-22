import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import './login.scss';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post('/auth/login', {
        email,
        password,
      });
      // Validate token before storage
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">{"Don't"} have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;