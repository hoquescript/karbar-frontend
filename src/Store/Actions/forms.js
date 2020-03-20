import {
    INITIATE_FETCH_FORM_CONTROL,
    FETCH_FORM_CONTROL,
    STORE_FORM_CONTROL,
    SET_CHIP_DATA,
    VIEW_REPORT_DATA,
    INITIATE_FETCH_REPORT_DATA,
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

export const viewReportData = (gridSql,data) => ({
  type: VIEW_REPORT_DATA,
  gridSql,
  data
});

export const initiateFetchReportData = () => ({
  type: INITIATE_FETCH_REPORT_DATA
});


