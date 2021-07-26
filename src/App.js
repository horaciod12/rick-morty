import React, { useEffect, useState, useCallback } from "react";
import { Pagination, Row, Col, Card } from "antd";

import "antd/dist/antd.css";
import "./App.css";

const pageSize = 15;
const { Meta } = Card;
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
      character.name.toLowerCase().includes(searchTerm)
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

  console.log(characters);

  return (
    <div className="App">
      <main>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <div style={{ margin: "20px 0" }}>
        <Pagination
          pageSize={pageSize}
          current={current}
          total={searchResults.length}
          onChange={handlePagination}
        />
        </div>
        {searchResults && (
          <Row>
            {searchResults.map(
              (character, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  <Col span={8} key={character.id}>
                    <Card title={`Name: ${character.name}`} bordered={true}>
                      <img
                        style={{ width: "70px" }}
                        src={character.image}
                        alt={character.name}
                      />
                      <div>
                        <span>
                          <b>Status:</b>{" "}
                        </span>
                        <span>{character.status}</span>
                      </div>
                      <div>
                        <span>
                          <b>Species:</b>{" "}
                        </span>
                        <span>{character.species}</span>
                      </div>
                      <div>
                        <span>
                          <b>Location name:</b>{" "}
                        </span>
                        <span>{character.location.name}</span>
                      </div>
                      <div>
                        <span>
                          <b>Origin name:</b>{" "}
                        </span>
                        <span>{character.origin.name}</span>
                      </div>
                    </Card>
                  </Col>
                )
            )}
          </Row>
        )}
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
};

export default App;
