/*import { Link } from 'react-router-dom';*/
import Link from 'next/link';
import './notFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="notFoundPageContainer">
      <p className="text">Page is not found</p>
      <button className="buttonBack">
        <Link className="link" href="/">
          Go to Home
        </Link>
      </button>
    </div>
  );
};
