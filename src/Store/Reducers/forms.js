import { FETCH_FORM_CONTROL, STORE_FORM_CONTROL } from "../Actions/actionTypes";

const initialState = {
    isFormLoading: true,
    forms: [],
    chipData: [],
    isGridLoading: true,
    gridData: [],
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORM_CONTROL:
            return {
                ...state,
                isFormLoading: true,
            };
        case STORE_FORM_CONTROL:
            return {
                ...state,
                forms: action.formsControl,
                isFormLoading: false
            };

        default:
            return state;
    }
};

export default formReducer;
