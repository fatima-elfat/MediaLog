import "./register.scss";
import BG from "../../assets/asset09.png";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      
      if (res?.status === 201) {
        navigate("/login");
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      if (!err?.response) {
        setError("No server response");
      } else {
        setError(err.response.data.message || "Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <div className="formWrapper">
          <div className="formHeader">
            <h1>Create Account</h1>
            <p>Join MediaLog and start tracking your media</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label htmlFor="username">Username</label>
              <input 
                id="username"
                name="username" 
                type="text" 
                required
                minLength={6}
                maxLength={20}
                placeholder="Enter your username" 
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                name="email" 
                type="email" 
                required
                placeholder="Enter your email" 
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                name="password" 
                type="password" 
                required
                minLength={6}
                placeholder="Enter your password" 
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
            {error && <div className="errorMessage">{error}</div>}
            <div className="formFooter">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
      <div className="imgContainer">
        <div className="imageWrapper">
          <img src={BG} alt="MediaLog" />
        </div>
      </div>
    </div>
  );
}

export default Register;
