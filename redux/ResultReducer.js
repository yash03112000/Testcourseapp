// Action Types

export const CHANGE = 'CHANGERESULT';

// Action Creators

let noteID = 0;

export function setResultact(result) {
  return {
    type: CHANGE,
    result,
  };
}

// reducer

const initialState = { sections: [] };

const ResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      return action.result;

    default:
      return state;
  }
};

export default ResultReducer;
