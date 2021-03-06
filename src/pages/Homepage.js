import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpaces } from "../store/space/actions";
import { selectLoadingState, selectAllSpaces } from "../store/space/selectors";
import { Jumbotron } from "react-bootstrap";

export default function Homepage() {
  const dispatch = useDispatch();
  const spaces = useSelector(selectAllSpaces);
  const loading = useSelector(selectLoadingState);

  useEffect(() => {
    dispatch(fetchAllSpaces);
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Jumbotron>
        <h1>Spaces</h1>
      </Jumbotron>
      {loading
        ? "loading"
        : spaces.map((space) => {
            return (
              <div
                key={space.id}
                style={{
                  color: `${space.color}`,
                  backgroundColor: `${space.backgroundColor}`,
                  border: `${space.backgroundColor} solid 2px`,
                  margin: ".2em auto",
                  width: "500px",
                  padding: "1em",
                }}
              >
                <h2>{space.title}</h2>
                <p>{space.description}</p>
                <Link to={`/spaces/${space.id}`}>
                  <Button>Visit space</Button>
                </Link>
              </div>
            );
          })}
    </div>
  );
}
