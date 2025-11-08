import { Link } from 'react-router-dom';

import notFoundImage from '@/shared/assets/image/404.jpg';

import '@/shared/ui/content/Content.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img
        src={notFoundImage}
        alt="страница не найдена"
        className="not-found-image"
      />
      <Link to="/" className="not-fount__back">
        На главную
      </Link>
    </div>
  );
};
