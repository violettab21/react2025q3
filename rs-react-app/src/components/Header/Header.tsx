import Link from 'next/link';
import './header.css';

export const Header = () => {
  return (
    <>
      <nav className={`header`}>
        <ul className="menu">
          <li className={`menuItem`}>
            <Link href="/" className="link">
              Home
            </Link>
          </li>
          <li className={`menuItem`}>
            <Link href="/about" className="link">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
