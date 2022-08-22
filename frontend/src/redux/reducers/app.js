const HIDDEN_FOOTER = 'HIDDEN_FOOTER';

const initState = {
    hiddenFooter: false
};

export default (state = initState, action)=>{
    switch (action.type) {
        case HIDDEN_FOOTER:{
            return  {
                ...state,
                hiddenFooter: action.hiddenFooter
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
