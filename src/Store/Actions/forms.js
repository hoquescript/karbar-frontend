import {
    INITIATE_FETCH_FORM_CONTROL,
    FETCH_FORM_CONTROL,
    STORE_FORM_CONTROL,
} from './actionTypes'

export const initiateFetchFormControl = menuParams => ({
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
