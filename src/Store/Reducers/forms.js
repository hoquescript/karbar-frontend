import {
    FETCH_FORM_CONTROL,
} from '../Actions/actionTypes'


const initialState = {
    forms: []
}

const formReducer = (state = initialState, action) => {
    switch (action.type) {

    case FETCH_FORM_CONTROL:
        return { ...state, forms: action.formsControl }

    default:
        return state
    }
}

export default formReducer