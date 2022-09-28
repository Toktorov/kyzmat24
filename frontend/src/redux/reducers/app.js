const HIDDEN_FOOTER = 'HIDDEN_FOOTER';
const LIST_WITH_CATEGORY = 'LIST_WITH_CATEGORY';
const SHOW_LIST_WITH_CATEGORY = 'SHOW_LIST_WITH_CATEGORY';

const initState = {
    hiddenFooter: false,
    listWithCategory: [],
    showListWithCategory: false,
};

export const app =(state = initState, action)=>{
    switch (action.type) {
        case HIDDEN_FOOTER:{
            return  {
                ...state,
                hiddenFooter: action.hiddenFooter
            }
        }
        case LIST_WITH_CATEGORY:{
            return {
                ...state,
                listWithCategory: action.listWithCategory
            }
        }
        case SHOW_LIST_WITH_CATEGORY:{
            return {
                ...state,
                showListWithCategory: action.showListWithCategory
            }
        }
        default:
            return state
    }
};

export const setHiddenFooter = (value) =>{
    return (dispatch)=>{
        return dispatch({type: HIDDEN_FOOTER, hiddenFooter: value})
    }
};
export const setListWithCategory = (list = [], id = null, type = "") =>{
    return (dispatch)=>{
        switch (type) {
            case "services" :{
                    return dispatch({type: LIST_WITH_CATEGORY, listWithCategory: list.filter((item)=>{
                            return item.user_category === id
                    })})
            }
            case "orders":{

                    const ordersWithCategory = list.filter((item)=>{
                        return item.category
                    });
                    return dispatch({type: LIST_WITH_CATEGORY, listWithCategory: ordersWithCategory.filter((item)=>{
                            return item.category.id === id
                        })})

            }
            default: {
                return dispatch({type: LIST_WITH_CATEGORY, listWithCategory:[]})
            }
        }
    }
};

export const setShowListWithCategory = (value) =>{
  return (dispatch)=>{
          return dispatch({type: SHOW_LIST_WITH_CATEGORY, showListWithCategory: value})
  }
};
