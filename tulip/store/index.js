import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { wallReducer } from "./wall";
import { sessionReducer } from "./session";
import { createLogger } from "redux-logger"
import { thunk } from "redux-thunk";
import { feedReducer } from "./feed"
import { quoteReducer } from "./quotes"

/// LOCAL TUNNEL URL FOR TESTING

export let url;
if (process.env.EXPO_PUBLIC_MODE === 'production') {
    url = 'placeholderURL.com/sample'
}
else {
    url = process.env.EXPO_PUBLIC_LOCAL_TUNNEL
}

/// REDUCERS

const rootReducer = combineReducers({
    walls: wallReducer,
    session: sessionReducer,
    feed: feedReducer,
    quotes: quoteReducer,
})


/// ENHANCERS

let enhancer;
if (process.env.EXPO_PUBLIC_MODE === 'production') {
    enhancer = applyMiddleware(thunk)
}
else {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, createLogger()))
}

/// STORE

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export const store = configureStore()
