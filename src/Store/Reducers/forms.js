import { FETCH_FORM_CONTROL, STORE_FORM_CONTROL, SET_CHIP_DATA, INITIATE_FETCH_REPORT_DATA } from "../Actions/actionTypes";

const initialState = {
    isFormLoading: true,
    forms: [],
    chipData: [],
    gridData: {
        isGridView: false,
        isGridLoading: false,
        gridSQL: '',
        gridData: []
    }
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORM_CONTROL:
            return {
                ...state,
                isFormLoading: true,
                chipData: [],
                gridData: {
                    ...state.gridData,
                    isGridView: false,
                    isGridLoading: false
                }
            };
        case STORE_FORM_CONTROL:
            return {
                ...state,
                forms: action.formsControl,
                isFormLoading: false
            };
        case SET_CHIP_DATA:
            return {
                ...state,
                chipData: action.chipData
            };
        case INITIATE_FETCH_REPORT_DATA:
            return {
                ...state,
                gridData: {
                    ...state.gridData,
                    isGridView: true,
                    isGridLoading: true
                }
            };
    
        default:
            return state;
    }
};

export default formReducer;
