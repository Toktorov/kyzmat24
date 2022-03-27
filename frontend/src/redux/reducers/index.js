import {combineReducers} from "redux";
import item from "./item";
import user from './user'

const rootReducer = () => combineReducers({
    item,
    user
});


export default rootReducer;