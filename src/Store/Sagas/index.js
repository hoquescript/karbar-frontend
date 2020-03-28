import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes'
import { fetchModulesMenu } from '../Sagas/menu';
import { fetchFormControls, viewReportData, postFormData } from '../Sagas/forms';

export function* watchMenu(){
    yield takeEvery(actionTypes.INITIATE_FETCH_MODULES_MENU, fetchModulesMenu)
}

export function* watchControl(){
    yield takeEvery(actionTypes.INITIATE_FETCH_FORM_CONTROL, fetchFormControls)
    yield takeEvery(actionTypes.POST_FORM_DATA, postFormData)
    yield takeEvery(actionTypes.VIEW_REPORT_DATA, viewReportData)
}