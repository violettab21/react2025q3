import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';
import { About } from './components/About/About';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Main />,
      children: [{ element: <CharacterDetails />, path: 'details/:id' }],
    },
    {
      path: '/about',
      element: <About />,
    },
  ],
  {
    basename: '/rs-react-app',
  }
);

export const App = () => {
  return <RouterProvider router={router} />;
};
