import React, { useEffect, useState, useCallback } from "react";
import { Input } from "antd";
import CardList from "./components/CardList/CardList";
import PaginationCmp from "./components/PaginationCmp/PaginationCmp";

import "antd/dist/antd.css";
import "./App.css";

const pageSize = 15;

const inputStyles = { maxWidth: "500px", margin: "20px" };

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

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
      setMinIndex(0);
      setMaxIndex(pageSize);
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
      character.location.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, characters]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePagination = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  return (
    <div className="App">
      <h2 className="Title">Rick and Morty</h2>
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        style={inputStyles}
      />
      <PaginationCmp
        pageSize={pageSize}
        current={current}
        searchResults={searchResults}
        onHandlePagination={handlePagination}
      />
      <CardList
        searchResults={searchResults}
        maxIndex={maxIndex}
        minIndex={minIndex}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
