'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '../../i18n/navigation';
import './header.css';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '../Theme/Theme';
import darkTheme from '../../assets/dark-theme.svg';
import lightTheme from '../../assets/light-theme.svg';
import Image from 'next/image';

export const Header = () => {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTheme = useTheme();

  const changeTheme = () => {
    if (currentTheme.theme === 'light') {
      currentTheme.setTheme('dark');
    } else currentTheme.setTheme('light');
  };

  return (
    <>
      <nav className={`header header-${currentTheme.theme}`}>
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
          <li className={`menuItem`}>
            <button className="theme" onClick={changeTheme}>
              <Image
                className="themeIcon"
                src={currentTheme.theme === 'light' ? lightTheme : darkTheme}
                alt="theme icon"
              ></Image>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
