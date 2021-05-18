// Action Types

export const CHANGE = 'CHANGEDATA'

// Action Creators

let noteID = 0

export function setDataact(data) {
  return {
    type: CHANGE,
    data
  }
}


// reducer

const initialState = {}

const DataReducer = (state = initialState, action)=>{
  switch (action.type) {
    case CHANGE:
      return action.data


    default:
      return state
  }
}

export default DataReducer