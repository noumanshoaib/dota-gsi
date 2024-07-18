const Bans = ({ data = [] }) => {
  return (
    <div className="banners_container">
      {data.map((banner, index) => (
        <div className="banner_image_container" key={`bans-${index}`}>
          {banner && banner.image !== "" ? (
            <img src={banner.image} alt="banner" />
          ) : `ban ${index + 1}`}
        </div>
      ))}
    </div>
  );
};

export default Bans;
