import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './components/Main/Main';

const router = createBrowserRouter([{ path: '/', element: <Main /> }], {
  basename: '/rs-react-app',
});

export const App = () => {
  return <RouterProvider router={router} />;
};
