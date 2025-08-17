import './about.css';
import { useTranslations } from 'next-intl';

export const About = () => {
  const t = useTranslations('AboutPage');
  return (
    <div data-testid="about" className="aboutContainer">
      <p>{t('author')}</p>
      <p>{t('aboutText')}</p>
      <p>
        {t('label')}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="courseLink"
        >
          {t('linkText')}
        </a>
      </p>
    </div>
  );
};
