import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Page Not Found</h2>
      <p className="not-found__desc">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="not-found__link">
        Go back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
