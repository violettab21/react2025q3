import { lazy, Suspense } from 'react';
import './App.css';
import { Loader } from './components/Loader/Loader';
const Countries = lazy(() => import('./components/Countries/Countries'));

function App() {
  return (
    <>
      <p>Performance task</p>
      <Suspense fallback={<Loader />}>
        <Countries />
      </Suspense>
    </>
  );
}

export default App;
