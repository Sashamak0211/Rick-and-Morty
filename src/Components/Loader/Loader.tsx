import portalLoading from '@assets/image/PortalLoading.png';

import { classNames } from '@/utils';

import './Loader.css';

interface ILoaderProps {
  size?: 'large' | 'small';
  label?: string;
}
export const Loader = ({ size = 'large', label = '' }: ILoaderProps) => {
  return (
    <div className={classNames('loader', `loader--${size}`)}>
      <img
        src={portalLoading}
        alt="Загрузка информации"
        className="loader__image"
      />

      {label && <p className="loader__label">{label}</p>}
    </div>
  );
};
