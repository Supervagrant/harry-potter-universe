import CharacterCard from "../character-card/character-card";

import "./style.css";

const CharactersList = ({ characters }) => {
  return (
    <div className="character-list">
      {characters.map((character) => {
        const { id, image, name, dateOfBirth, house, patronus, wand } =
          character;
        return (
          <CharacterCard
            key={id}
            id={id}
            image={image}
            name={name}
            dateOfBirth={dateOfBirth}
            house={house}
            patronus={patronus}
            wand={wand}
          />
        );
      })}
    </div>
  );
};

export default CharactersList;
