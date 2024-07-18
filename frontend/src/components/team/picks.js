const Picks = ({ data = [] }) => {
    const picks = data[0];
  return (
      <div className="picks_container">
        {picks.map((pick, index) => (
            <div className="picks_item">
              <div className="picks_image_container">
                {pick && pick.image !== "" ? (
                    <img src={pick.image} alt="pick banner" />
                ) : `pick ${index + 1}`}
              </div>
              <label>pickedBy: {pick.pickedBy.name}
              </label>
            </div>
        ))}
      </div>
  );
};

export default Picks;
