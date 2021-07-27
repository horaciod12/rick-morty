import { Row, Col, Card } from "antd";

import classes from "../CardList/CardList.module.css"

const cardStyles = {
  margin: "10px", 
  background: "lightGrey"
};

const CardList = (props) => {

  const { searchResults, maxIndex, minIndex } = props;

  return (
    searchResults && (
      <Row>
        {searchResults.map(
          (character, index) =>
            index >= minIndex &&
            index < maxIndex && (
              <Col span={8} key={character.id}>
                <Card
                  title={`Name: ${character.name}`}
                  bordered={true}
                  style={cardStyles}
                >
                  <img
                    className={classes.img}
                    src={character.image}
                    alt={character.name}
                    title={character.name}
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
    )
  );
};

export default CardList;
