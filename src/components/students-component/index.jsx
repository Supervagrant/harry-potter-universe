import { useEffect, useState, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import "./style.css";

const StudentsComponent = () => {
  const apiStudents = "https://hp-api.onrender.com/api/characters/students";
  const [students, setStudents] = useState(null);
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
    if (!apiStudents) {
      console.warn("API URL is not provided");
      return;
    }

    setLoading(true);

    fetch(apiStudents)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err.message);
        setLoading(false);
      });
  }, [apiStudents]);

  const filteredStudents = useMemo(
    () =>
      students?.filter((student) => {
        return student.name.toLowerCase().includes(searchField);
      }) || [],
    [students, searchField],
  );

  const onSearchChange = (e) => {
    const searchField = e.target.value.toLowerCase();

    debouncedSetSearchField(searchField);
  };
console.log('students ', students)
  return (
    <div className="wrapper">
      {loading ? (
        <p>Loading... Wait a little bit</p>
      ) : students ? (
        <div>
          <h1>Hogwarts Students:</h1>
          <input
            className="search-box"
            type="search"
            placeholder="search student by name..."
            onChange={onSearchChange}
          />
          <div>Here will be the list of students</div>
        </div>
      ) : (
        <p>No characters available</p>
      )}
    </div>
  );
};

export default StudentsComponent;
