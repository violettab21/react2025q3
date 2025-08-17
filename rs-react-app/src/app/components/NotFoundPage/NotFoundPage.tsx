import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/navigation';
import './notFoundPage.css';

export const NotFoundPage = () => {
  const t = useTranslations('NotFoundPage');
  return (
    <div className="notFoundPageContainer">
      <p className="text">{t('text')}</p>
      <button className="buttonBack">
        <Link className="link" href="/">
          {t('button')}
        </Link>
      </button>
    </div>
  );
};
