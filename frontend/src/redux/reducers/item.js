import axios from "axios";


const GET_ITEMS = 'GET_ITEMS';

const CHANGE_STATUS = 'CHANGE_STATUS';

const GET_BTNS = 'GET_BTNS';

const GET_SERVICE = 'GET_SERVICE';

const SET_APP = 'SET_APP';

const ADD_ITEM = 'ADD_ITEM';

const initState = {
    items: [],
    status: 'home',
    service: {},
    btns:[],
    app: ''
};


export default (state = initState, action) => {
    switch (action.type) {

        case CHANGE_STATUS : {
            return {
                ...state,
                status: action.change
            }
        }


        case GET_ITEMS : {
            return {
                ...state,
                items: action.arr
            }
        }

        case GET_BTNS : {
            return {
                ...state,
                btns: action.arr
            }
        }

        case GET_SERVICE : {
            return {
                ...state,
                service: action.service
            }
        }
        case SET_APP :{
            return {
                ...state,
                app: action.change
            }
        }



        default:
            return state
    }
};

export const setStatus = (state) =>{
    return(dispatch) => {
        return dispatch({type: CHANGE_STATUS, change: `${state}`})
    }
};

export const getItems = () => {
    return (dispatch) => {
        axios('/api/users/')
            .then(({data}) => {
                return dispatch({type: GET_ITEMS, arr: data.filter(item => item.status_user !== 'Free')})
            })
    }

};

export const getBtns = () => {
    return (dispatch) => {
        axios('https://kyzmat24.com/api/category/')
        .then(({data}) => {
            return dispatch({type: GET_BTNS, arr: data})
        }).catch(error => console.log(error.response))
    }

};

export const getService = (id) =>{
  return (dispatch) =>{
      axios('/api/users/')
          .then(({data}) =>{
              return dispatch({type: GET_SERVICE, service: data.filter(item =>{
                  return item.id == id
                  })[0]})
      })
  }
};

export const setApp = (app) =>{
    return(dispatch) => {
        return dispatch({type: SET_APP, change: `${app}`})
    }
};


