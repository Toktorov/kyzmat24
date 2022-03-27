import jwt_decode from 'jwt-decode';
import axios from "axios";


const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';
const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_ORDERS = 'GET_ORDERS';


const initState = {
    authTokens: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
    user: localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null,
    orders: [],
};


export default (state = initState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKENS:{
            return {
                ...state,
                authTokens: action.authTokens
            }
        }
        case SET_USER:{
            return {
                ...state,
                user: action.user
            }
        }
        case LOGOUT_USER:{
            localStorage.removeItem('authTokens');
            return {
                ...state,
                authTokens: null,
                user: null
            }
        }
        case GET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            }
        }

        default:
            return state
    }
};
export const setAuthTokens = (authTokens) => {
    return (dispatch) => {
        dispatch({type: SET_AUTH_TOKENS, authTokens})
    }
};

export const setUser = (user) =>{
    return (dispatch) => {
        dispatch({type: SET_USER, user})
    }
};
export const logoutUser = () =>{
  return (dispatch) => {
      dispatch({type: LOGOUT_USER})
  }
};


export const getOrders = () =>{
  return (dispatch) =>{
      axios('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/order/order/')
          .then(({data})=>  dispatch({type: GET_ORDERS, orders: data}))
  }
};