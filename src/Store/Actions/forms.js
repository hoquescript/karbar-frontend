import {
    FETCH_FORM_CONTROL,
    INITIATE_FETCH_FORM_CONTROL
} from './actionTypes'

export const fetchFormControl = menuParams => ({
    type: INITIATE_FETCH_FORM_CONTROL,
    menuParams
});
  
export const storeFormControl = formsControl => ({
  type: FETCH_FORM_CONTROL,
  formsControl
});
