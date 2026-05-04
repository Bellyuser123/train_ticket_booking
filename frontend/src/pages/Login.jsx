import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const user = response.data.user;
      localStorage.setItem("rapidUser", JSON.stringify(user));
      setMessage("Login successful. Redirecting to trains...");
      setTimeout(() => navigate("/trains"), 600);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="page-card max-w-md mx-auto">
      <h1 className="section-title">Login</h1>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="input-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full"
          />
        </div>
        <button type="submit" className="w-full">Login</button>
      </form>
    </section>
  );
};

export default Login;
