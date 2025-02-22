import { useEffect, useState, useMemo, useCallback } from "react";
import CharactersList from "../../components/characters-list";
import debounce from "lodash/debounce";
import "./style.css";

const CharactersPage = () => {
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
          <CharactersList characters={filteredCharacters} />
        </div>
      ) : (
        <p>No characters available</p>
      )}
    </div>
  );
};

export default CharactersPage;
