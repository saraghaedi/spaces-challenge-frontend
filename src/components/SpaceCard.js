import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpaces } from "../store/space/actions";
import { selectLoadingState, selectAllSpaces } from "../store/space/selectors";
export default function SpaceCard() {
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
      {loading
        ? "loading"
        : spaces.map((space) => {
            return (
              <div
                style={{
                  color: `${space.color}`,
                  backgroundColor: `${space.backgroundColor}`,
                  border: "black solid 2px",
                  margin: ".2em auto",
                  width: "500px",
                  padding: "1em",
                }}
              >
                <h2>{space.title}</h2>
                <p>{space.description}</p>
                <button>Visit space</button>
              </div>
            );
          })}
    </div>
  );
}
