import "./style.css";

const Character = ({ id, image, name, dateOfBirth, house, patronus, wand }) => {
  return (
    <div key={id} className="character">
      {image && (
        <img
          className="character__image"
          src={image}
          alt={`${name} portrait`}
          width="160px"
          height="auto"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
      <div className="character__data">
        {name && (
          <p>
            <span>Name:</span> {name}
          </p>
        )}
        {dateOfBirth && (
          <p>
            <span>Date of birth:</span> {dateOfBirth}
          </p>
        )}
        {house && (
          <p>
            <span>Hogwarts house:</span> {house}
          </p>
        )}
        {patronus && (
          <p>
            <span>Patronus:</span> {patronus}
          </p>
        )}
        {wand.core && (
          <p>
            <span>Magic wand:</span> {wand.core} and {wand.wood}
          </p>
        )}
      </div>
    </div>
  );
};

export default Character;
