import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';

import './globals.css';
import { ThemeProvider } from '../../components/Theme/Theme';
import { Header } from '../../components/Header/Header';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <title>Class components</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <Header />
            <MainWrapper> {children}</MainWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
