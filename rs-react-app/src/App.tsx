import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './components/Main/MainPage';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';
import { About } from './components/About/About';
import { Layout } from './components/Layout/Layout';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
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
      ],
    },
  ],
  {
    basename: '/rs-react-app',
  }
);

export const App = () => {
  return <RouterProvider router={router} />;
};
