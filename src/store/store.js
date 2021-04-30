import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import burgerBuilderReducer from "./reducers/BurgerBuilderReducer";
import orderReducer from "./reducers/OrderReducer";
import authReducer from "./reducers/AuthReducer";

let reducers = {
    burger: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
};
export default function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    return createStore(combineReducers(reducers), preloadedState, composedEnhancers)
}