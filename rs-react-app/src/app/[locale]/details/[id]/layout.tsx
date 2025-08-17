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
          <div>{mainPage}</div>
          <div>{character}</div>
          {children}
        </div>
      </StoreProvider>
    </>
  );
}
