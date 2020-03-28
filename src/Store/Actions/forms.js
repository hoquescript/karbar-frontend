import {
    INITIATE_FETCH_FORM_CONTROL,
    FETCH_FORM_CONTROL,
    STORE_FORM_CONTROL,
    SET_CHIP_DATA,
    ADD_GRID_CONTROL_DATA,
    EDIT_GRID_CONTROL_DATA,
    DELETE_GRID_CONTROL_DATA,
    POST_FORM_DATA,
    VIEW_REPORT_DATA,
    INITIATE_FETCH_REPORT_DATA,
    STORE_REPORT_DATA
} from './actionTypes'

export const initiateFetchFormControl = (menuParams) => ({
    type: INITIATE_FETCH_FORM_CONTROL,
    menuParams
});

export const fetchFormControl = () => ({
  type: FETCH_FORM_CONTROL
});

export const storeFormControl = formsControl => ({
  type: STORE_FORM_CONTROL,
  formsControl
});

export const setChipData = chipData => ({
  type: SET_CHIP_DATA,
  chipData
});

export const addGridControlData = gridControlData => ({
  type: ADD_GRID_CONTROL_DATA,
  gridControlData
});

export const deleteAllGridControlData = gridControlKey => ({
  type: DELETE_GRID_CONTROL_DATA,
  gridControlKey
});

export const editGridControlData = (key, gridControlData) => ({
  type: EDIT_GRID_CONTROL_DATA,
  key,
  gridControlData
});

export const deleteGridControlData = gridControlKey => ({
  type: DELETE_GRID_CONTROL_DATA,
  gridControlKey
});

export const postFormData = (data, chipData, gridControlData) => ({
  type: POST_FORM_DATA,
  data,
  chipData,
  gridControlData
});

export const viewReportData = (gridSQL, data, chipData) => ({
  type: VIEW_REPORT_DATA,
  gridSQL,
  data,
  chipData
});

export const initiateFetchReportData = () => ({
  type: INITIATE_FETCH_REPORT_DATA
});

export const storeReportData = (reportData) => ({
  type: STORE_REPORT_DATA,
  reportData
});

