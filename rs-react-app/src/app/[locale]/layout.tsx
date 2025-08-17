import { Header } from '../components/Header/Header';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '../components/Theme/Theme';
import { MainWrapper } from '../components/MainWrapper/MainWrapper';
import './global.css';

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
