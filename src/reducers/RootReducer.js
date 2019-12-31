import { combineReducers } from 'redux';
import TinderReducer from './TinderReducer';
import MetaDataReducer from './MetaDataReducer';
import DispenserReducer from './DispenserReducer';

export default combineReducers({
    TinderReducer,
    DispenserReducer,
    MetaDataReducer
});
