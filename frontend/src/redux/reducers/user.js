import axios from "axios";
const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';
const SET_USER = 'SET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_ORDERS = 'GET_ORDERS';
const SET_NEW_USER = 'SET_NEW_USER';
const SET_ID = 'SET_ID';
const GET_ACCEPT_ORDERS = 'GET_ACCEPT_ORDERS';
const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';


const initState = {
    authTokens: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
    id: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('id')) : null,
    user: null,
    orders: [],
    orderDetails: {},
    acceptOrders:[],
    newUser: false,
};

export const user= (state = initState, action) => {
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
            localStorage.clear();
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
        case GET_ORDER_DETAILS:{
            return {
                ...state,
                orderDetails: action.orderDetails
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

export const setUser = (id) => {
    return (dispatch) => {
        axios(`/api/users/${id}`)
            .then(({data})=>{
                localStorage.setItem('user', JSON.stringify(data));
                return  dispatch({type: SET_USER, user: data})
            }).catch(error => {
                if (error.response.status === 404){
                    // dispatch(logoutUser())
                }
        });

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
                          return [...acc, {
                              acceptId: rec.id,
                              ...rec.order
                          }]
                      } else {
                          return acc
                      }
                  }, [])
              })
          })
  }
};

export const getOrderDetails = (id) =>{
    return (dispatch) =>{
        axios.get('https://kyzmat24.com/api/order/order/')
            .then(({data}) => dispatch({type: GET_ORDER_DETAILS, orderDetails: data.filter((item)=>{
                return `${item.id}` === `${id}`
                })[0]}))
    }
};