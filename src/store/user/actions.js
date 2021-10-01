import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export function deleteStoryAction(id) {
  return {
    type: "user/deleteStory",
    payload: id,
  };
}

export function deleteStory(id) {
  return async function thunk(dispatch, getState) {
    try {
      await axios.delete(`http://localhost:4000/stories/${id}`);
      dispatch(deleteStoryAction(id));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function createStoryAction(data) {
  return {
    type: "user/createStory",
    payload: data,
  };
}

export function createStory(name, content, imageUrl, spaceId, token) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.post(
        `http://localhost:4000/stories/`,
        {
          name,
          content,
          imageUrl,
          spaceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Story Created Successfully!",
          3000
        )
      );
      dispatch(createStoryAction(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function editSpaceAction(data) {
  return {
    type: "user/editSpace",
    payload: data,
  };
}

export function editSpace(
  id,
  title,
  description,
  backgroundColor,
  color,
  token
) {
  return async function thunk(dispatch, getState) {
    try {
      console.log("title", title, typeof title);
      console.log("des", description, typeof description);
      console.log("backcolor", backgroundColor, typeof backgroundColor);
      console.log("color", color, typeof color);
      const response = await axios.put(
        `http://localhost:4000/spaces/${id}`,
        {
          title,
          description,
          backgroundColor,
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Space Edited Successfully!",
          3000
        )
      );
      dispatch(editSpaceAction(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
}
