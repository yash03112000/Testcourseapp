// Action Types

export const CHANGE = 'CHANGEQUESID'

// Action Creators

let noteID = 0

export function setQuesidact( quesid) {
  return {
    type: CHANGE,
    quesid
  }
}


// reducer

const initialState = ''

const QuesidReducer = (state = initialState, action)=>{
  switch (action.type) {
    case CHANGE:
      return action.quesid


    default:
      return state
  }
}

export default QuesidReducer