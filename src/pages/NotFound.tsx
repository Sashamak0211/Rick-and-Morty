import { Link } from 'react-router-dom';

import { NotFoundLogo } from '@/shared';

import './notFound.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img
        src={NotFoundLogo}
        alt="страница не найдена"
        className="not-found-image"
      />
      <Link to="/" className="not-found__back">
        На главную
      </Link>
    </div>
  );
};
