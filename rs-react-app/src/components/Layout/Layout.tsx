/*import { Link, Outlet } from 'react-router-dom';*/
/*import './layout.css';
import darkTheme from '../../assets/dark-theme.svg';
import lightTheme from '../../assets/light-theme.svg';
import { ThemeContext } from '../../context/Context';
import { useContext } from 'react';

export const Layout = () => {
  const currentTheme = useContext(ThemeContext);

  const changeTheme = () => {
    if (currentTheme.theme === 'light') {
      currentTheme.setTheme('dark');
    } else currentTheme.setTheme('light');
  };

  return (
    <>
      <nav className={`header header-${currentTheme.theme}`}>
        <ul className="menu">
          <li className={`menuItem menuItem-${currentTheme.theme}`}>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className={`menuItem menuItem-${currentTheme.theme}`}>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
        </ul>
        <button className="theme" onClick={changeTheme}>
          <img
            className="themeIcon"
            src={currentTheme.theme === 'light' ? lightTheme : darkTheme}
          ></img>
        </button>
      </nav>
      <main className={`main main-${currentTheme.theme}`}>
        <Outlet />
      </main>
    </>
  );
};*/
