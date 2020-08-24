import { createAction, createSlice } from '@reduxjs/toolkit'

export const fetchControl = createAction('form/fetchControl');

const form = createSlice({
    name: 'form',
    initialState: {
        isFormLoading: true,
        controls: [],
        values: {
            common: {},
            chips: [],
            gridControls: [],
            editControls: [],
            tabControls: {}
        },
        error:{

        }
    },
    reducers: {
        storeControl: (form, action) => {
            form.isFormLoading = false;
            form.controls = action.payload.controls;
        },
        addGridControl: (form, action) => {
            const container = action.payload.tabIndex ? form.values.tabControls[`${action.payload.tabIndex}`]: form.values.gridControls;
            container.push(action.payload.gridControl);
        },
        editGridControl: (form, action) => {
            const container = action.payload.tabIndex ? form.values.tabControls[`${action.payload.tabIndex}`]: form.values.gridControls;
            const index = container.findIndex(gridControl => gridControl.key === action.payload.key);
            container[index] = action.payload.gridControl;
        },
        deleteGridControl: (form, action) => {
            const container = action.payload.tabIndex ? form.values.tabControls[`${action.payload.tabIndex}`]: form.values.gridControls;
            const index = container.findIndex(gridControl => gridControl.key === action.payload.key);
            container.splice(index, 1);
        },
        deleteAllGridControl: (form, action) => {
            let container = action.payload.tabIndex ? form.values.tabControls[`${action.payload.tabIndex}`]: form.values.gridControls;
            container.splice(0, container.length);
        },
        syncTabControl: (form, action) => {
            action.payload.tabParams.forEach(tabParam => {
                form.values.tabControls[`${tabParam}`] = []
            })
        },
        addTabControl: (form, action) => {
            const key = form.values.tabControls[action.payload.index].length + 1 
            form.values.tabControls[action.payload.index].push({ key, ...action.payload.values })
        },
        editTabControl: (form, action) => {
            const index = form.values.tabControls[action.payload.index].findIndex(tabControl => tabControl.key === action.payload.key);
            console.log(index,action.payload.values)
            form.values.tabControls[action.payload.index][index] = {key: action.payload.key, ...action.payload.values};
        },
        deleteTabControl: (form, action) => {
            const index = form.values.gridControls.findIndex(gridControl => gridControl.key === action.payload.key);
            form.values.gridControls.splice(index, 1);
        },
        deleteAllTabControl: (form) => {
            form.values.gridControls = [];
        },
        resetFormState: (form) => {
            form.isFormLoading = true;
            form.controls = [];
            form.values = {
                common: {},
                chips: [],
                gridControls: [],
                editControls: [],
                tabControls: {}
            };
            form.error = {};
        },
    }
})

export default form.reducer;
export const { 
    storeControl, 
    resetFormState, 
    addGridControl, 
    editGridControl, 
    deleteGridControl, 
    deleteAllGridControl,
    syncTabControl,
    addTabControl,
    editTabControl,
    deleteTabControl,
    deleteAllTabControl
} = form.actions;


// import {
//     INITIATE_FETCH_FORM_CONTROL,
//     FETCH_FORM_CONTROL,
//     STORE_FORM_CONTROL,
//     SET_CHIP_DATA,
//     ADD_GRID_CONTROL_DATA,
//     EDIT_GRID_CONTROL_DATA,
//     DELETE_GRID_CONTROL_DATA,
//     POST_FORM_DATA,
//     VIEW_REPORT_DATA,
//     INITIATE_FETCH_REPORT_DATA,
//     STORE_REPORT_DATA
// } from './actionTypes'

// export const initiateFetchFormControl = (menuParams, tabParams) => ({
//     type: INITIATE_FETCH_FORM_CONTROL,
//     menuParams,
//     tabParams
// });

// export const fetchFormControl = () => ({
//   type: FETCH_FORM_CONTROL
// });

// export const storeFormControl = formsControl => ({
//   type: STORE_FORM_CONTROL,
//   formsControl
// });

// export const setChipData = chipData => ({
//   type: SET_CHIP_DATA,
//   chipData
// });

// export const addGridControlData = gridControlData => ({
//   type: ADD_GRID_CONTROL_DATA,
//   gridControlData
// });

// export const deleteAllGridControlData = gridControlKey => ({
//   type: DELETE_GRID_CONTROL_DATA,
//   gridControlKey
// });

// export const editGridControlData = (key, gridControlData) => ({
//   type: EDIT_GRID_CONTROL_DATA,
//   key,
//   gridControlData
// });

// export const deleteGridControlData = gridControlKey => ({
//   type: DELETE_GRID_CONTROL_DATA,
//   gridControlKey
// });

// export const postFormData = (data, chipData, gridControlData) => ({
//   type: POST_FORM_DATA,
//   data,
//   chipData,
//   gridControlData
// });

// export const viewReportData = (gridSQL, data, chipData) => ({
//   type: VIEW_REPORT_DATA,
//   gridSQL,
//   data,
//   chipData
// });

// export const initiateFetchReportData = () => ({
//   type: INITIATE_FETCH_REPORT_DATA
// });

// export const storeReportData = (reportData) => ({
//   type: STORE_REPORT_DATA,
//   reportData
// });

// import {
//     FETCH_FORM_CONTROL,
//     STORE_FORM_CONTROL,
//     SET_CHIP_DATA,
//     ADD_GRID_CONTROL_DATA,
//     DELETE_ALL_GRID_CONTROL_DATA,
//     EDIT_GRID_CONTROL_DATA,
//     DELETE_GRID_CONTROL_DATA,
//     INITIATE_FETCH_REPORT_DATA,
//     STORE_REPORT_DATA
// } from "../Actions/actionTypes";

// const initialState = {
//     isFormLoading: true,
//     forms: [],
//     chipData: [],
//     gridControlData: [],
//     gridData: {
//         isGridView: false,
//         isGridLoading: false,
//         gridSQL: "",
//         gridData: []
//     }
// };

// const formReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_CHIP_DATA:
//             return {
//                 ...state,
//                 chipData: action.chipData
//             };
//         case ADD_GRID_CONTROL_DATA:
//             return {
//                 ...state,
//                 gridControlData: state.gridControlData.concat(action.gridControlData)
//             };
//         case DELETE_ALL_GRID_CONTROL_DATA:
//             return {
//                 ...state,
//                 gridControlData: state.gridControlData.filter(ctrl => ctrl.key !== action.gridControlKey)
//             };
//         case EDIT_GRID_CONTROL_DATA:
//             return {
//                 ...state,
//                 gridControlData: state.gridControlData.map(ctrl => {
//                     if(ctrl.key === action.key){
//                         return {...action.gridControlData, key: ctrl.key}
//                     }
//                     return ctrl;
//                 })
//             };
//         case DELETE_GRID_CONTROL_DATA:
//             return {
//                 ...state,
//                 gridControlData: state.gridControlData.filter(ctrl => ctrl.key !== action.gridControlKey)
//             };
//         case INITIATE_FETCH_REPORT_DATA:
//             return {
//                 ...state,
//                 gridData: {
//                     ...state.gridData,
//                     isGridView: true,
//                     isGridLoading: true
//                 }
//             };
//         case STORE_REPORT_DATA:
//             return {
//                 ...state,
//                 chipData: [],
//                 gridData: {
//                     ...state.gridData,
//                     isGridLoading: false,
//                     gridData: action.reportData
//                 }
//             };

//         default:
//             return state;
//     }
// };

// export default formReducer;
