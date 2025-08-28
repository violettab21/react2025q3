import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );
  }, []);

  return (
    <>
      <p>Performance task</p>
    </>
  );
}

export default App;
