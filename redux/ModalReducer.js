// Action Types

export const CHANGE = 'CHANGEMODAL'

// Action Creators

let noteID = 0

export function setModalact(modal) {
  return {
    type: CHANGE,
    modal
  }
}


// reducer

const initialState = false;

const ModalReducer = (state = initialState, action)=>{
  switch (action.type) {
    case CHANGE:
      return action.modal


    default:
      return state
  }
}

export default ModalReducer