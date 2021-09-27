const initialState = {
  loading: true,
  all: [],
  details: {},
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
    default: {
      return state;
    }
  }
}
