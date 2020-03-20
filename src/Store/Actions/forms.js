import {
    INITIATE_FETCH_FORM_CONTROL,
    FETCH_FORM_CONTROL,
    STORE_FORM_CONTROL,
} from './actionTypes'

export const initiateFetchFormControl = (menuParams,hookForm) => ({
    type: INITIATE_FETCH_FORM_CONTROL,
    menuParams,
    hookForm
});

export const fetchFormControl = (hookForm) => ({
  type: FETCH_FORM_CONTROL,
  hookForm
});

export const storeFormControl = formsControl => ({
  type: STORE_FORM_CONTROL,
  formsControl
});
