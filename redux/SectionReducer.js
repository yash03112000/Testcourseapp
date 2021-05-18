// Action Types

export const CHANGE = 'CHANGESEC'

// Action Creators

let noteID = 0

export function setSectionact(section) {
  return {
    type: CHANGE,
    section
  }
}


// reducer

const initialState = {}

const SectionReducer = (state = initialState, action)=>{
  switch (action.type) {
    case CHANGE:
      return action.section


    default:
      return state
  }
}

export default SectionReducer