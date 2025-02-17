const CharactersList = ({ characters }) => {
  return (
    <div className="character-list">
    {characters.map((character) => {
      return (
        <div key={character.id} className="character">
          {character.image && (
            <img
              className="character__image"
              src={character.image}
              alt={`${character.name} portrait`}
              width="160px"
              height="auto"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <div className="character__data">
            {character.name && (
              <p>
                <span>Name:</span> {character.name}
              </p>
            )}
            {character.dateOfBirth && (
              <p>
                <span>Date of birth:</span> {character.dateOfBirth}
              </p>
            )}
            {character.house && (
              <p>
                <span>Hogwarts house:</span> {character.house}
              </p>
            )}
            {character.patronus && (
              <p>
                <span>Patronus:</span> {character.patronus}
              </p>
            )}
            {character.wand.core && (
              <p>
                <span>Magic wand:</span> {character.wand.core} and{" "}
                {character.wand.wood}
              </p>
            )}
          </div>
        </div>
      );
    })}
  </div>
  );
};

export default CharactersList;
