import { NavLink } from "react-router-dom";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("rapidUser")) || null;
  const tte = JSON.parse(localStorage.getItem("rapidTTE")) || null;

  const handleLogout = () => {
    localStorage.removeItem("rapidUser");
    localStorage.removeItem("rapidTTE");
    window.location.href = "/";
  };

  return (
    <nav>
      <div className="logo">RapidSella</div>
      <div className="nav-actions">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/trains">Trains</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/tte/login">TTE Login</NavLink>
        {user ? (
          <>
            <span style={{ marginRight: "1rem", color: "#9ca3af" }}>
              {user.name}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : tte ? (
          <>
            <span style={{ marginRight: "1rem", color: "#9ca3af" }}>
              TTE
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
