import {combineReducers} from "redux";
import item from "./item";
import user from './user';
import app from "./app";

const rootReducer = () => combineReducers({
    item,
    user,
    app
});


export default rootReducer;