import portalLoading from "/src/assets/image/PortalLoading.png";
import "./Loader.css";

interface ILoaderProps {
  size?: "large" | "small";
  label?: string;
}
export const Loader = ({ size = "large", label = "" }: ILoaderProps) => {
  return (
    <div
      className={`loader ${
        size === "large" ? "loader--large" : "loader--small"
      }`}
    >
      <img
        src={portalLoading}
        alt="Загрузка информации"
        className="loader__image"
      />

      {label && <p className="loader__label">{label}</p>}
    </div>
  );
};
