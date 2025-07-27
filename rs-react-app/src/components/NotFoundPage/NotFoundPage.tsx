import { Link } from 'react-router-dom';
import './notFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="notFoundPageContainer">
      <p className="text">Page is not found</p>
      <button className="buttonBack">
        <Link className="link" to="/">
          Go to Home
        </Link>
      </button>
    </div>
  );
};
