import './loader.css';

export const Loader = () => {
  return (
    <div>
      <p>We are fetching data, it can take a couple of minutes</p>
      <span data-testid="loader" className="loader"></span>
    </div>
  );
};
