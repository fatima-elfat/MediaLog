import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth/';

const register = (email, name, password) => {
  return axios.post(API_URL + 'register', {
    email,
    name,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data?.token) {
        try {
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error('Failed to store user data:', error);
        }
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
