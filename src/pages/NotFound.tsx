import { Link } from 'react-router-dom';

import { NotFoundLogo } from '@/shared';

import '@pages/notFound.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img
        src={NotFoundLogo}
        alt="страница не найдена"
        className="not-found-image"
      />
      <Link to="/" className="not-fount__back">
        На главную
      </Link>
    </div>
  );
};
