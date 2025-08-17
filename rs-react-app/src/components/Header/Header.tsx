'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '../../i18n/navigation';
import './header.css';
import { useSearchParams } from 'next/navigation';

export const Header = () => {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      <nav className={`header`}>
        <ul className="menu">
          <li className={`menuItem`}>
            <Link href="/" className="link">
              {t('home')}
            </Link>
          </li>
          <li className={`menuItem`}>
            <Link href="/about" className="link">
              {t('about')}
            </Link>
          </li>
          <li className={`menuItem`}>
            <select
              defaultValue={locale}
              onChange={(e) => {
                const page = searchParams.get('page');
                const params = page ? `/?page=${page}` : '';
                router.replace(`${pathname}${params}`, {
                  locale: `${e.target.value}`,
                });
              }}
            >
              <option value="en">English</option>
              <option value="ru">Russian</option>
            </select>
          </li>
        </ul>
      </nav>
    </>
  );
};
