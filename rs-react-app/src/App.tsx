import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './components/Main/MainPage';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';
import { About } from './components/About/About';
import { Layout } from './components/Layout/Layout';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { createContext, useState } from 'react';

export const ThemeContext = createContext<{
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}>({ theme: 'light', setTheme: () => {} });

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      path: '/',
      children: [
        {
          path: '/',
          element: <MainPage />,
          children: [{ element: <CharacterDetails />, path: 'details/:id' }],
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: '/rs-react-app',
  }
);

export const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext value={{ theme: theme, setTheme: setTheme }}>
      <RouterProvider router={router} />
    </ThemeContext>
  );
};
