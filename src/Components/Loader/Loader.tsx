import "./Loader.css";

interface ILoaderProps {
  size?: "large" | "small";
  label?: string;
}
export const Loader = ({ size = "large", label = "" }: ILoaderProps) => {
  return (
    <div className={`loader ${size === 'large' ? 'loader--large' : 'loader--small'}`}>
      <div className="loader">
        <img
          src="/public/images/PortalLoading.png"
          alt="Загрузка информации"
          className="loader__image"
        />
      </div>
      {label && <p className="loader__label">{label}</p>}
    </div>
  );
};
