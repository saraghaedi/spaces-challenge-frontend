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

export function fetchedSpaceDetail(spacedetail) {
  return {
    type: "space/fetchedSpaceDetail",
    payload: spacedetail,
  };
}

export async function fetchAllSpaces(dispatch, getState) {
  dispatch(startLoading);
  try {
    const response = await axios.get(`http://localhost:4000/spaces`);
    dispatch(fetchedSpaces(response.data));
  } catch (e) {
    console.log(e.message);
  }
}

export function fetchSpaceDetail(id) {
  return async function thunk(dispatch, getState) {
    dispatch(startLoading);
    try {
      const response = await axios.get(`http://localhost:4000/spaces/${id}`);
      dispatch(fetchedSpaceDetail(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}
