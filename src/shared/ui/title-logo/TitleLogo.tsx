import rickMortyLogo from '@assets/image/Rick and Morty Title.png';

export const TitleLogo = () => (
  <div className="title-logo">
    <img
      src={rickMortyLogo}
      alt="Rick and Morty title"
      className="title-logo-img"
    />
  </div>
);
