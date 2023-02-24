import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import postReducer from "./reducers/post";

const store = configureStore({
    reducer: combineReducers({
        postReducer,
    }),
    middleware: [thunk],
    composeWithDevTools,
});

export default store;
