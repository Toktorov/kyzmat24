import jwt_decode from 'jwt-decode';
import axios from "axios";


const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';
const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_ORDERS = 'GET_ORDERS';
const SET_NEW_USER = 'SET_NEW_USER';
const SET_ID = 'SET_ID';
const GET_ACCEPT_ORDERS = 'GET_ACCEPT_ORDERS';

const initState = {
    authTokens: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
    id: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('id')) : null,
    user:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null,
    orders: [],
    acceptOrders:[],
    newUser: false,
};


export default (state = initState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKENS: {
            return {
                ...state,
                authTokens: action.authTokens
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        case LOGOUT_USER: {
            localStorage.removeItem('authTokens');
            localStorage.removeItem('user');
            return {
                ...state,
                authTokens: null,
                user: null,
                id: null
            }
        }
        case GET_ORDERS: {
            return {
                ...state,
                orders: action.orders
            }
        }
        case SET_NEW_USER :{
            return {
                ...state,
                newUser: action.newUser
            }
        }
        case SET_ID:{
            return {
                ...state,
                id: action.id
            }
        }
        case GET_ACCEPT_ORDERS:{
            return {
                ...state,

                    acceptOrders: action.acceptOrders

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

export const setUser = (user) => {
    return (dispatch) => {
        dispatch({type: SET_USER, user})
    }
};
export const logoutUser = () => {
    return (dispatch) => {
        dispatch({type: LOGOUT_USER})
    }
};


export const getOrders = () => {
    return (dispatch) => {
        axios('https://kyzmat24.com/api/order/order/')
            .then(({data}) => dispatch({type: GET_ORDERS, orders: data}))
    }
};

export const setNewUser = (boolean) =>{
  return (dispatch)=>{
      dispatch({type:SET_NEW_USER, newUser: boolean})
  }
};

export const setId = (id) =>{
  return (dispatch) =>{
   dispatch({type: SET_ID, id:id})
  }
};

export const getAcceptOrders = () =>{
  return (dispatch) =>{
      axios.get('https://kyzmat24.com/api/order/accept_order/')
          .then(({data}) =>{

              return dispatch({type: GET_ACCEPT_ORDERS, acceptOrders: data.reduce((acc, rec)=>{
                      if (rec.user.id === initState.id){
                          return [...acc, rec.order]
                      } else {
                          return acc
                      }
                  }, [])
              })
          })
  }
};