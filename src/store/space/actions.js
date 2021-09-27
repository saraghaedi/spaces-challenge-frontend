import axios from "axios";

export function startLoading() {
  return {
    type: "space/startLoading",
  };
}

export function fetchedSpaces(spaces) {
  return {
    type: "space/fetchedSpaces",
    payload: spaces,
  };
}

export async function fetchAllSpaces(dispatch, getState) {
  dispatch(startLoading);
  const response = await axios.get(`http://localhost:4000/spaces`);
  dispatch(fetchedSpaces(response.data));
}
