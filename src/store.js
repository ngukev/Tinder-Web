
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import RootReducer from './reducers/RootReducer';

export default function configureStore() {
    return createStore(
        RootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
}