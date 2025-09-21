
import { useContext, useState, useCallback } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthProvider";
import BG from "../../assets/asset09.png";

/**
 * Login component for user authentication.
 * 
 * Features:
 * - Form validation with error handling
 * - Loading states during authentication
 * - Responsive design
 * - Integration with authentication context
 * 
 * @returns {JSX.Element} The login component
 */
function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  /**
   * Handles input changes and updates form data.
   * Also clears validation errors for the changed field.
   * 
   * @param {Event} e - The input change event
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  }, [validationErrors]);

  /**
   * Validates form data before submission.
   * 
   * @param {Object} data - The form data to validate
   * @returns {Object} Validation errors object
   */
  const validateForm = useCallback((data) => {
    const errors = {};
    
    if (!data.username.trim()) {
      errors.username = "Username is required";
    } else if (data.username.length < 6) {
      errors.username = "Username must be at least 6 characters";
    } else if (data.username.length > 20) {
      errors.username = "Username must be less than 20 characters";
    }
    
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    return errors;
  }, []);

  /**
   * Handles form submission and user authentication.
   * 
   * @param {Event} e - The form submit event
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    
    // Validate form data
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest.post("/auth/login", {
        username: formData.username.trim(),
        password: formData.password,
      });
      
      if (response.data) {
        updateUser(response.data);
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, updateUser, navigate]);

  return (
    <div className="login">
      <div className="formContainer">
        <div className="formWrapper">
          <div className="formHeader">
            <h1>Welcome Back</h1>
            <p>Sign in to your MediaLog account</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="inputGroup">
              <label htmlFor="username">Username</label>
              <input 
                id="username"
                name="username" 
                type="text" 
                value={formData.username}
                onChange={handleInputChange}
                required 
                minLength={6} 
                maxLength={20}
                placeholder="Enter your username"
                aria-invalid={!!validationErrors.username}
                aria-describedby={validationErrors.username ? "username-error" : undefined}
              />
              {validationErrors.username && (
                <div id="username-error" className="field-error" role="alert">
                  {validationErrors.username}
                </div>
              )}
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleInputChange}
                required 
                minLength={6}
                placeholder="Enter your password"
                aria-invalid={!!validationErrors.password}
                aria-describedby={validationErrors.password ? "password-error" : undefined}
              />
              {validationErrors.password && (
                <div id="password-error" className="field-error" role="alert">
                  {validationErrors.password}
                </div>
              )}
            </div>
            <button type="submit" disabled={isLoading} aria-describedby={error ? "login-error" : undefined}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {error && (
              <div id="login-error" className="errorMessage" role="alert">
                {error}
              </div>
            )}
            <div className="formFooter">
              <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
          </form>
        </div>
      </div>
      <div className="imgContainer">
        <div className="imageWrapper">
          <img src={BG} alt="MediaLog - Track your media consumption" />
        </div>
      </div>
    </div>
  );
}

export default Login;
