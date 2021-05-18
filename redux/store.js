import { createStore,combineReducers } from 'redux'
import SectionReducer  from './SectionReducer'
import ResultReducer from './ResultReducer'
import QuesidReducer from './QuesidReducer'
import DataReducer from './DataReducer'
import QuesarrayReducer from './QuesarrayReducer'
import ModalReducer from './ModalReducer'

const rootReducer = combineReducers({
    SectionReducer,
    ResultReducer,
    QuesarrayReducer,
    QuesidReducer,
    DataReducer,
    ModalReducer
})

const store = createStore(rootReducer)

export default store