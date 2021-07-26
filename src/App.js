import React, { useEffect, useState, useCallback } from "react";
import { Pagination } from "antd";

import "antd/dist/antd.css";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchCharactersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const results = data.results;

      const loadedCharacters = [];

      for (const key in results) {
        loadedCharacters.push({
          id: key,
          name: results[key].name,
          status: results[key].status,
          image: results[key].image,
          species: results[key].species,
          origin: results[key].origin,
          location: results[key].location,
        });
      }

      setCharacters(loadedCharacters);
    } catch (error) {
      setError("Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCharactersHandler();
  }, [fetchCharactersHandler]);

  useEffect(() => {
    const results = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, characters]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <main>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        {searchResults && (
          <ul>
            {searchResults.map((character) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <Pagination
          defaultCurrent={1} total={50}
        />
      </main>
    </div>
  );
};

export default App;
