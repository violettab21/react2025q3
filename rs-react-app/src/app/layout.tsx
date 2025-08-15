import { Header } from '../components/Header/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <title>Class components</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
