const Bans = ({ data = [], isBlinkBan = false }) => {
  let blinkClass = "blink_me";
  let banIndex = null;

  data.forEach((ban, index) => {
    if(ban && ban.image === "" && banIndex === null && isBlinkBan) {
      banIndex = index;
    }
  });

  return (
    <div className="banners_container">
      {data.map((ban, index) => (
        <div className={"banner_image_container " + (banIndex !== null ? (index === banIndex ? blinkClass : "") : "") } key={`bans-${index}`}>
          {ban && ban.image !== "" ? (
            <img src={ban.image} alt="banner" />
          ) : `ban ${index + 1}`}
        </div>
      ))}
    </div>
  );
};

export default Bans;
