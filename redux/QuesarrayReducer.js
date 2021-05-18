// Action Types

export const CHANGE = 'CHANGEQUESARR'

// Action Creators

let noteID = 0

export function setQuesarract(quesarr) {
  return {
    type: CHANGE,
    quesarr
  }
}


// reducer

const initialState = []

const QuesarrayReducer = (state = initialState, action)=>{
  switch (action.type) {
    case CHANGE:
      return action.quesarr


    default:
      return state
  }
}

export default QuesarrayReducer