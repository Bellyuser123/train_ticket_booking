import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbMap = {
    '': 'Home',
    'login': 'Login',
    'register': 'Register',
    'trains': 'Trains',
    'seats': 'Seat Selection',
    'payment': 'Payment',
    'confirm': 'Confirmation',
    'admin': 'Admin',
    'tte': 'TTE'
  };

  return (
    <nav className="mb-4 text-sm text-slate-400">
      <Link to="/" className="hover:text-slate-200">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            {' > '}
            {isLast ? (
              <span className="text-slate-200">{breadcrumbMap[name] || name}</span>
            ) : (
              <Link to={routeTo} className="hover:text-slate-200">{breadcrumbMap[name] || name}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;