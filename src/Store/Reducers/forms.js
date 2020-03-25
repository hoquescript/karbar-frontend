import {
    FETCH_FORM_CONTROL,
    STORE_FORM_CONTROL,
    SET_CHIP_DATA,
    ADD_GRID_CONTROL_DATA,
    EDIT_GRID_CONTROL_DATA,
    DELETE_GRID_CONTROL_DATA,
    INITIATE_FETCH_REPORT_DATA,
    STORE_REPORT_DATA
} from "../Actions/actionTypes";

const initialState = {
    isFormLoading: true,
    forms: [],
    chipData: [],
    gridControlData: [],
    gridData: {
        isGridView: false,
        isGridLoading: false,
        gridSQL: "",
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
        case ADD_GRID_CONTROL_DATA:
            return {
                ...state,
                gridControlData: state.gridControlData.concat(action.gridControlData)
            };
        case DELETE_GRID_CONTROL_DATA:
            return {
                ...state,
                gridControlData: state.gridControlData.filter(ctrl => ctrl.key !== action.gridControlKey)
            };
        case EDIT_GRID_CONTROL_DATA:
            return {
                ...state,
                gridControlData: state.gridControlData.map(ctrl => {
                    if(ctrl.key === action.key){
                        return {...action.gridControlData, key: ctrl.key}
                    }
                    return ctrl;
                })
            };
        case DELETE_GRID_CONTROL_DATA:
            return {
                ...state,
                gridControlData: state.gridControlData.filter(ctrl => ctrl.key !== action.gridControlKey)
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
        case STORE_REPORT_DATA:
            return {
                ...state,
                chipData: [],
                gridData: {
                    ...state.gridData,
                    isGridLoading: false,
                    gridData: action.reportData
                }
            };

        default:
            return state;
    }
};

export default formReducer;
