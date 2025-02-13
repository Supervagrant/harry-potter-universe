import { useEffect, useState, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import "./style.css";

const CharactersComponent = () => {
  const apiCharacters = "https://hp-api.onrender.com/api/characters";
  const [characters, setCharacters] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedSetSearchField = useCallback(
    debounce((value) => setSearchField(value), 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchField.cancel();
    };
  }, [debouncedSetSearchField]);

  useEffect(() => {
    if (!apiCharacters) {
      console.warn("API URL is not provided");
      return;
    }

    setLoading(true);

    fetch(apiCharacters)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err.message);
        setLoading(false);
      });
  }, [apiCharacters]);

  const filteredCharacters = useMemo(
    () =>
      characters?.filter((character) => {
        return character.name.toLowerCase().includes(searchField);
      }) || [],
    [characters, searchField],
  );

  const onSearchChange = (e) => {
    const searchField = e.target.value.toLowerCase();

    debouncedSetSearchField(searchField);
  };

  return (
    <div className="wrapper">
      {loading ? (
        <p>Loading... Wait a little bit</p>
      ) : characters ? (
        <div>
          <h1>Characters:</h1>
          <input
            className="search-box"
            type="search"
            placeholder="search caracter by name..."
            onChange={onSearchChange}
          />
          <div className="character-list">
            {filteredCharacters.map((character) => {
              console.log(character);
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
        </div>
      ) : (
        <p>No characters available</p>
      )}
    </div>
  );
};

export default CharactersComponent;
