const initialState = {
  loading: true,
  all: [],
  details: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "space/startLoading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "space/fetchedSpaces": {
      return {
        ...state,
        loading: false,
        all: [...action.payload],
      };
    }
    case "space/fetchedSpaceDetail": {
      return {
        ...state,
        loading: false,
        details: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
