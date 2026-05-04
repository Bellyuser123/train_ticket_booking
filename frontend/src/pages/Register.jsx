import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser({ name, email, password });
      setMessage("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <section className="page-card max-w-md mx-auto">
      <h1 className="section-title">Register</h1>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="input-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full"
          />
        </div>
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
            placeholder="Choose a password"
            className="w-full"
          />
        </div>
        <button type="submit" className="w-full">Register</button>
      </form>
    </section>
  );
};

export default Register;
