import StoreProvider from '../../../../store/StoreProvider';

export default function DetailsLayout({
  children,
  mainPage,
}: {
  children: React.ReactNode;
  mainPage: React.ReactNode;
}) {
  return (
    <>
      {' '}
      <StoreProvider>
        {' '}
        <div>{mainPage}</div>
        {children}
      </StoreProvider>
    </>
  );
}
