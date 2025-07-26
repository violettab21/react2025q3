import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Main />,
      children: [{ element: <CharacterDetails />, path: 'details/:id' }],
    },
  ],
  {
    basename: '/rs-react-app',
  }
);

export const App = () => {
  return <RouterProvider router={router} />;
};
