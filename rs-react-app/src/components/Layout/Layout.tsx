import { Link, Outlet } from 'react-router';
import './layout.css';

export const Layout = () => {
  return (
    <>
      <nav className="header">
        <ul className="menu">
          <li className="menuItem">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/about" className="link">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};
