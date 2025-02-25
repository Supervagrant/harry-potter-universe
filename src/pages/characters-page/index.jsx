import { useEffect, useState, useMemo, useCallback } from "react";
import CharactersList from "../../components/characters-list";
import SeacrhBox from "../../components/search-box";
import Pagination from "../../components/pagination";
import debounce from "lodash/debounce";
import "./style.css";

const CharactersPage = ({ items = [], itemsPerPage = 9 }) => {
  const apiCharacters = "https://hp-api.onrender.com/api/characters";
  const [characters, setCharacters] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCharacters.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  return (
    <div className="wrapper">
      {loading ? (
        <p>Loading... Wait a little bit</p>
      ) : characters ? (
        <div className="characters-page">
          <h1>Characters:</h1>
          <SeacrhBox
            placeholder="Search caracter by name..."
            onChangeHandler={onSearchChange}
            classNameProp="characters-search-box"
          />
          <CharactersList characters={currentItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            siblingCount={1}
            showFirstLast={true}
          />
        </div>
      ) : (
        <p>No characters available</p>
      )}
    </div>
  );
};

export default CharactersPage;
