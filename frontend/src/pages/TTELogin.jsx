import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tteLogin } from "../services/api";

const TTELogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await tteLogin({ email, password });
      const tte = response.data.tte;
      localStorage.setItem("rapidTTE", JSON.stringify(tte));
      setMessage("Login successful. Redirecting...");
      setTimeout(() => navigate("/tte/dashboard"), 600);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="page-card max-w-md mx-auto">
      <h1 className="section-title">TTE Login</h1>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="input-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tte@example.com"
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

export default TTELogin;