import { lazy, Suspense } from 'react';
import './App.css';
//import Countries from './components/Countries';
const Countries = lazy(() => import('./components/Countries'));

function App() {
  return (
    <>
      <p>Performance task</p>
      <Suspense fallback={<p>Loading</p>}>
        <Countries />
      </Suspense>
    </>
  );
}

export default App;
