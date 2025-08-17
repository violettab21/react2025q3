import { Header } from '../components/Header/Header';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '../../i18n/routing';
import { useRouter, usePathname } from '../../i18n/navigation';
import { notFound, useSearchParams } from 'next/navigation';
import { ThemeProvider } from '../components/Theme/Theme';
import { MainWrapper } from '../components/MainWrapper/MainWrapper';
import './global.css';

export default async function LocaleLayout({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page: string; search: string }>;
}) {
  /* const router = useRouter();
  const pathname = usePathname();*/
  const { locale } = await params;
  /*onst { page, search } = await searchParams;*/
  if (!hasLocale(routing.locales, locale)) {
    /*const paramsPage = page ? `/?page=${page}` : '';
    const paramsSearch = search ? `&search=${search}` : '';
    router.replace(`${pathname}${paramsPage}${paramsSearch}`, {
      locale: `en`,
    });*/
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
