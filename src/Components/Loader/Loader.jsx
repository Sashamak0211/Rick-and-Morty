import './Loader.css'

export const Loader = ({ size = 'large', label = ''}) => {
  return (
    <div className={`loader-box {size}`}>
      <div className="loader">
        <img 
        src="/public/images/PortalLoading.png" 
        alt="Загрузка информации"
        className="loader-img" />
      </div>
      {label && <p className='loader-label' >{label}</p>}
    </div>
  );
};
