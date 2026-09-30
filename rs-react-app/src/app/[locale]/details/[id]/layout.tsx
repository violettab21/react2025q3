import StoreProvider from '../../../../store/StoreProvider';
import './detailsLayout.css';

export default function DetailsLayout({
  children,
  mainPage,
  character,
}: {
  children: React.ReactNode;
  mainPage: React.ReactNode;
  character: React.ReactNode;
}) {
  return (
    <>
      {' '}
      <StoreProvider>
        {' '}
        <div className="block">
          <div className="characters">{mainPage}</div>
          <div className="character">{character}</div>
          {children}
        </div>
      </StoreProvider>
    </>
  );
}
